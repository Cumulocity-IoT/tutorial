import { IFetchResponse } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { Observable } from 'rxjs';
import { generateResponse, handleRequest } from '../utils/common';
import { generateDashboard } from '../../__mocks/utils/generators/managedObjects';

export class ContextDashboardInterceptor implements HttpInterceptor {
  dashboard = generateDashboard({
    device: { id: '12345', name: 'Demo Sensor Device' },
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
    return generateResponse(() => this.dashboard);
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

  private mockGET(_requestDescriptor: string) {
    const responseGenerators = this.getResponseGenerators();

    for (const urlPart in responseGenerators) {
      if (_requestDescriptor.includes(urlPart)) {
        const generatorResult = responseGenerators[urlPart]();
        if (generatorResult) {
          return generateResponse(() => generatorResult);
        }
      }
    }
    return null;
  }

  private getResponseGenerators() {
    return {
      'example-widget': () => ({
        managedObjects: [this.dashboard],
      }),
    };
  }
}
