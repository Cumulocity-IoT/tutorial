import { IManagedObject } from '@c8y/client';
import { getMOCommonProps } from './managedObjects';

/**
 * A place around which sample devices are positioned.
 */
interface SampleSite {
  /**
   * Name of the place, used to name its devices.
   */
  name: string;
  lat: number;
  lng: number;
  /**
   * How many devices are positioned around the place.
   */
  deviceCount: number;
  /**
   * Radius in degrees over which the devices are spread.
   */
  spread: number;
}

/**
 * The devices of one place, plus the group that holds them.
 */
export interface SampleSiteDevices {
  /**
   * Id of the group managed object that represents the place in the asset selector.
   */
  id: string;
  name: string;
  /**
   * Center of the place, used to center the map on the group when it is selected.
   */
  lat: number;
  lng: number;
  devices: IManagedObject[];
}

/**
 * The places the sample devices are positioned around. The amounts are chosen so that the cluster
 * map has something to cluster: zoomed out, the places are merged into a few markers with a count,
 * while zooming into a place reveals its individual devices.
 */
const SAMPLE_SITES: SampleSite[] = [
  { name: 'Düsseldorf', lat: 51.2254, lng: 6.7763, deviceCount: 120, spread: 0.08 },
  { name: 'Berlin', lat: 52.52, lng: 13.405, deviceCount: 90, spread: 0.08 },
  { name: 'Munich', lat: 48.1372, lng: 11.5755, deviceCount: 40, spread: 0.06 },
  { name: 'London', lat: 51.5074, lng: -0.1278, deviceCount: 70, spread: 0.08 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, deviceCount: 55, spread: 0.06 },
  { name: 'Madrid', lat: 40.4168, lng: -3.7038, deviceCount: 25, spread: 0.05 },
  { name: 'Rome', lat: 41.9028, lng: 12.4964, deviceCount: 20, spread: 0.05 },
  { name: 'Stockholm', lat: 59.3293, lng: 18.0686, deviceCount: 12, spread: 0.04 },
  { name: 'New York', lat: 40.7128, lng: -74.006, deviceCount: 65, spread: 0.08 },
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194, deviceCount: 35, spread: 0.06 },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298, deviceCount: 18, spread: 0.05 },
  { name: 'São Paulo', lat: -23.5505, lng: -46.6333, deviceCount: 14, spread: 0.05 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, deviceCount: 22, spread: 0.06 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, deviceCount: 10, spread: 0.04 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, deviceCount: 8, spread: 0.04 },
];

/**
 * Angle of Vogel's spiral, used to spread the devices of a place evenly. Compared to random
 * positions this keeps the sample data the same on every request, so panning and zooming the map
 * does not make devices jump around.
 */
const GOLDEN_ANGLE = 2.399963229728653;

/**
 * The id the generated devices start at. High enough to not collide with the randomly generated
 * ids of the other mocks.
 */
const FIRST_DEVICE_ID = 700000;

/**
 * The id the site groups start at. Kept above the device ids so the two never collide.
 */
const FIRST_GROUP_ID = 800000;

/**
 * Severities the devices with an active alarm cycle through, so that the map shows the status
 * colors of single devices and of a cluster of devices.
 */
const ALARM_SEVERITIES = ['critical', 'major', 'minor', 'warning'] as const;

/**
 * Every n-th device gets an active alarm.
 */
const DEVICE_WITH_ALARM_INTERVAL = 7;

/**
 * How far a device moves per realtime update.
 */
const MOVE_STEP_DEGREES = 0.0015;

/**
 * The sample devices, created once so that every mock works with the same devices and a device
 * that moved stays where it moved to.
 */
let sampleSites: SampleSiteDevices[];

/**
 * How often each device moved already, used to move it along a circle.
 */
const moveCount = new Map<string, number>();

/**
 * Returns the sample devices of every place, positioned around it.
 * @returns The devices per place.
 */
export function getClusterMapSampleSites(): SampleSiteDevices[] {
  if (!sampleSites) {
    let id = FIRST_DEVICE_ID;
    sampleSites = SAMPLE_SITES.map((site, siteIndex) => ({
      id: `${FIRST_GROUP_ID + siteIndex}`,
      name: site.name,
      lat: site.lat,
      lng: site.lng,
      devices: [...Array(site.deviceCount)].map((_, index) => createDevice(site, index, id++)),
    }));
  }

  return sampleSites;
}

/**
 * Returns one group managed object per place, so that the asset selector of the cluster map with
 * a root node lists the places as selectable groups.
 * @returns The group of every place.
 */
export function getClusterMapSiteGroups(): IManagedObject[] {
  return getClusterMapSampleSites().map(
    (site) =>
      ({
        id: site.id,
        name: site.name,
        ...getMOCommonProps(),
        type: 'c8y_DeviceGroup',
        c8y_IsDeviceGroup: {},
        // Lets the example center the map on the place when its group is selected.
        c8y_Position: { lat: site.lat, lng: site.lng, alt: 0, accuracy: 0 },
      }) as IManagedObject,
  );
}

/**
 * Moves the sample device with the given id a bit further along a circle around its place, so that
 * a map following the device shows it moving instead of jumping to an unrelated position.
 * @param id Id of the device to move.
 * @returns The moved device, or `undefined` if the id is not one of the sample devices.
 */
export function moveClusterMapSampleDevice(id: string): IManagedObject | undefined {
  const device = getClusterMapSampleSites()
    .flatMap((site) => site.devices)
    .find((sampleDevice) => sampleDevice.id === id);

  if (!device) {
    return undefined;
  }

  const step = (moveCount.get(id) ?? 0) + 1;
  moveCount.set(id, step);
  const angle = step * GOLDEN_ANGLE;
  device.c8y_Position = {
    ...device.c8y_Position,
    lat: round(device.c8y_Position.lat + MOVE_STEP_DEGREES * Math.cos(angle)),
    lng: round(device.c8y_Position.lng + MOVE_STEP_DEGREES * Math.sin(angle)),
  };

  return device;
}

function createDevice(site: SampleSite, index: number, id: number): IManagedObject {
  const radius = site.spread * Math.sqrt((index + 1) / site.deviceCount);
  const angle = index * GOLDEN_ANGLE;
  // Compensating the latitude keeps the devices spread in a circle instead of an ellipse.
  const lngScale = 1 / Math.cos((site.lat * Math.PI) / 180);
  const severity =
    id % DEVICE_WITH_ALARM_INTERVAL === 0
      ? ALARM_SEVERITIES[id % ALARM_SEVERITIES.length]
      : undefined;

  return {
    id: `${id}`,
    name: `${site.name} sensor ${index + 1}`,
    ...getMOCommonProps(),
    type: 'c8y_SensorPhone',
    c8y_IsDevice: {},
    c8y_Position: {
      lat: round(site.lat + radius * Math.cos(angle)),
      lng: round(site.lng + radius * Math.sin(angle) * lngScale),
      alt: 0,
      accuracy: 10,
    },
    ...(severity ? { c8y_ActiveAlarmsStatus: { [severity]: 1 } } : {}),
  } as IManagedObject;
}

function round(coordinate: number): number {
  return Math.round(coordinate * 1e6) / 1e6;
}
