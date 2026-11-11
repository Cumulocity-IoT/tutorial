import { IFetchResponse } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { Observable } from 'rxjs';
import { generateResponse, handleRequest } from '../utils/common';
import { generateDashboard } from '../../__mocks/utils/generators/managedObjects';

export class NamedContextDashboardInterceptor implements HttpInterceptor {
  dashboard = generateDashboard({
    id: '1000000',
    name: 'myCustomDeviceDashboardName-3',
    device: {
      name: 'Device abc',
      id: '200',
    },
  });

  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    const method = req?.options?.method;
    if (req?.url?.includes('inventory/managedObjects') && (method === 'PUT' || method === 'POST')) {
      this.applyBody(req.options.body);
    }
    return handleRequest(req, next, 'inventory/managedObjects', {
      POST: this.mockPOST.bind(this),
      PUT: this.mockPUT.bind(this),
      GET: this.mockGET.bind(this),
    });
  }

  private mockPOST(_requestDescriptor: string) {
    return generateResponse(() => this.dashboard);
  }

  private mockPUT(_requestDescriptor: string) {
    if (/\/\d+/.test(_requestDescriptor)) {
      return generateResponse(() => this.dashboard);
    }
    return null;
  }

  /**
   * Answers the named-dashboard lookup with the held dashboard, renamed to
   * the requested name — the lookup filters on the exact
   * `c8y_Dashboard!name!<name>` fragment and the name embeds the (generated)
   * device id. An empty result would trigger the read-only fallback, as the
   * sandbox user has no roles.
   */
  private mockGET(requestDescriptor: string) {
    const name = requestDescriptor.match(/c8y_Dashboard!name!([A-Za-z0-9_-]+)/)?.[1];
    if (name) {
      this.renameDashboard(name);
      return generateResponse(() => ({
        managedObjects: [this.dashboard],
      }));
    }
    return null;
  }

  private renameDashboard(name: string) {
    const dashboard = this.dashboard as Record<string, unknown>;
    for (const key of Object.keys(dashboard)) {
      if (key.startsWith('c8y_Dashboard!name!')) {
        delete dashboard[key];
      }
    }
    dashboard[`c8y_Dashboard!name!${name}`] = {};
  }

  /**
   * Merges the request body into the held dashboard so the save response carries the saved
   * settings and widget changes. They reset on the next navigation (each one registers a new
   * interceptor instance) and on page reload.
   */
  private applyBody(rawBody: unknown) {
    try {
      const body = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody;
      if (body && typeof body === 'object') {
        this.dashboard = { ...this.dashboard, ...body, id: this.dashboard.id };
      }
    } catch {
      // Non-JSON body — keep the canned dashboard.
    }
  }
}
