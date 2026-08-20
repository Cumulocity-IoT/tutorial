import { IFetchResponse, IManagedObject } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { from, Observable } from 'rxjs';
import { generateResponse } from '../utils/common';
import {
  getClusterMapSampleSites,
  getClusterMapSiteGroups,
  SampleSiteDevices,
} from '../utils/generators/clusterDevices';

/**
 * What a cluster map query asks for. The cluster map loads its devices per bounding box, counts
 * them before loading them and asks for the outermost device to fit the map to all devices.
 */
interface PositionQuery {
  latMin?: number;
  latMax?: number;
  lngMin?: number;
  lngMax?: number;
  /**
   * True if the bounding box crosses the antimeridian. The longitudes are combined with `or`
   * instead of `and` in that case.
   */
  lngWraps: boolean;
  orderBy?: {
    coordinate: 'lat' | 'lng';
    ascending: boolean;
  };
  /**
   * Id of the managed object the query is restricted to, if the map uses a root node.
   */
  scopedToId?: string;
}

/**
 * Leaflet is lazy loaded. Answering too fast leads to markers that are not rendered.
 */
const LEAFLET_LAZY_LOAD_DELAY_MS = 300;

/**
 * A number in a query, optionally suffixed by the `f` or `d` type marker the platform uses.
 */
const QUERY_NUMBER = '(-?\\d+(?:\\.\\d+)?)[fd]?';

/**
 * Answers the inventory queries of the cluster map examples with a fixed set of sample devices,
 * spread over places around the world. Queries the cluster map does not send, for example the ones
 * of the asset selector, are passed on to the global inventory mock.
 */
export class ClusterMapInterceptor implements HttpInterceptor {
  private readonly sites: SampleSiteDevices[] = getClusterMapSampleSites();
  private readonly devices: IManagedObject[] = this.sites.flatMap((site) => site.devices);

  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    const params = (req?.options?.params ?? {}) as Record<string, unknown>;
    const query = [params.query, params.q].find((value) => typeof value === 'string') as string;
    const { method = 'GET' } = req?.options || {};

    if (method !== 'GET' || !req?.url?.includes('inventory/managedObjects')) {
      return next.handle(req);
    }

    if (query?.includes('has(c8y_Position)')) {
      return from(this.mockPositionQuery(query, params));
    }

    // The asset selector of the root node example lists the places as selectable groups.
    if (isRootGroupQuery(query, params)) {
      return from(this.mockGroupQuery());
    }

    return next.handle(req);
  }

  private async mockGroupQuery() {
    await new Promise((resolve) => setTimeout(resolve, LEAFLET_LAZY_LOAD_DELAY_MS));
    const groups = getClusterMapSiteGroups();

    return generateResponse(() => ({ managedObjects: groups }), {
      totalPages: 1,
      pageSize: groups.length,
      currentPage: 1,
    });
  }

  private async mockPositionQuery(query: string, params: Record<string, unknown>) {
    await new Promise((resolve) => setTimeout(resolve, LEAFLET_LAZY_LOAD_DELAY_MS));

    const matching = this.getMatchingDevices(parsePositionQuery(query));
    const pageSize = Number(params?.pageSize) || matching.length || 1;

    return generateResponse(() => ({ managedObjects: matching.slice(0, pageSize) }), {
      // The cluster map counts the devices of a bounding box by requesting a single one and
      // reading the total pages, so this has to reflect the number of matching devices.
      totalPages: Math.ceil(matching.length / pageSize),
      pageSize,
      currentPage: 1,
    });
  }

  private getMatchingDevices(query: PositionQuery): IManagedObject[] {
    const searched = query.scopedToId ? this.getDevicesOfRootNode(query.scopedToId) : this.devices;
    const matching = searched.filter((device) => isInBounds(device, query));

    if (!query.orderBy) {
      return matching;
    }

    const { coordinate, ascending } = query.orderBy;
    return [...matching].sort(
      (a, b) =>
        (getCoordinate(a, coordinate) - getCoordinate(b, coordinate)) * (ascending ? 1 : -1),
    );
  }

  /**
   * Returns the devices a map with a root node shows. A root node that is one of the place groups
   * resolves to the devices of that place, one that is a sample device to that single device, so
   * that selecting a place in the asset selector shows exactly its devices.
   * @param id Id of the root node.
   * @returns The devices belonging to the root node.
   */
  private getDevicesOfRootNode(id: string): IManagedObject[] {
    const site = this.sites.find(({ id: siteId }) => siteId === id);
    if (site) {
      return site.devices;
    }

    const device = this.devices.find(({ id: deviceId }) => deviceId === id);
    if (device) {
      return [device];
    }

    const siteIndex = Math.abs(Number(id) || 0) % this.sites.length;
    return this.sites[siteIndex].devices;
  }
}

/**
 * Whether the request is the asset selector asking for its root groups. A user with inventory
 * roles gets a `has(c8y_IsDeviceGroup)` query; the `noLogin` user of the examples lacks those
 * roles, so the asset selector falls back to a `fragmentType=c8y_IsDeviceGroup` parameter instead.
 */
function isRootGroupQuery(query: string, params: Record<string, unknown>): boolean {
  return query?.includes('c8y_IsDeviceGroup') || params.fragmentType === 'c8y_IsDeviceGroup';
}

function parsePositionQuery(query: string): PositionQuery {
  const lngConditions = new RegExp(
    `\\(c8y_Position\\.lng gt ${QUERY_NUMBER}\\)\\s*(and|or)\\s*\\(c8y_Position\\.lng lt`,
  ).exec(query);

  return {
    latMin: parseCondition(query, 'lat', 'gt'),
    latMax: parseCondition(query, 'lat', 'lt'),
    lngMin: parseCondition(query, 'lng', 'gt'),
    lngMax: parseCondition(query, 'lng', 'lt'),
    lngWraps: lngConditions?.[2] === 'or',
    orderBy: parseOrderBy(query),
    scopedToId: parseScopedToId(query),
  };
}

function parseCondition(
  query: string,
  coordinate: 'lat' | 'lng',
  operator: 'gt' | 'lt',
): number | undefined {
  const match = new RegExp(`c8y_Position\\.${coordinate} ${operator} ${QUERY_NUMBER}`).exec(query);
  return match ? Number(match[1]) : undefined;
}

function parseOrderBy(query: string): PositionQuery['orderBy'] {
  const match = /\$orderby=c8y_Position\.(lat|lng) (asc|desc)/.exec(query);
  return match
    ? { coordinate: match[1] as 'lat' | 'lng', ascending: match[2] === 'asc' }
    : undefined;
}

function parseScopedToId(query: string): string | undefined {
  // The platform writes these as a function call, `bygroupid(1)`, and the id of a managed object
  // as a quoted value, `id eq '1'`.
  const ofGroup = /(?:bygroupid|isinhierarchyof)(?:\(|\s+eq\s+)'?(\d+)'?/.exec(query);
  const ofManagedObject = /\bid eq '?(\d+)'?/.exec(query);

  return (ofGroup ?? ofManagedObject)?.[1];
}

function isInBounds(device: IManagedObject, query: PositionQuery): boolean {
  const lat = getCoordinate(device, 'lat');
  const lng = getCoordinate(device, 'lng');

  if (query.latMin !== undefined && lat <= query.latMin) {
    return false;
  }
  if (query.latMax !== undefined && lat >= query.latMax) {
    return false;
  }

  const afterMin = query.lngMin === undefined || lng > query.lngMin;
  const beforeMax = query.lngMax === undefined || lng < query.lngMax;

  return query.lngWraps ? afterMin || beforeMax : afterMin && beforeMax;
}

function getCoordinate(device: IManagedObject, coordinate: 'lat' | 'lng'): number {
  return Number(device.c8y_Position?.[coordinate]);
}
