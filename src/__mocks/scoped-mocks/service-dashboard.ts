import { IFetchResponse } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { generateResponse, handleRequest } from '../utils/common';
import { Observable } from 'rxjs';
import { generateDashboard } from '../utils/generators/managedObjects';

export class ServiceDashboardInterceptor implements HttpInterceptor {
  dashboard = generateDashboard({
    id: '1000000',
    name: 'myCustomDeviceDashboardName-3',
    device: {
      name: 'Service',
      id: '<contextId>'
    }
  });

  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    return handleRequest(req, next, 'inventory/managedObjects', {
      POST: this.mockPOST.bind(this),
      PUT: this.mockPUT.bind(this),
      GET: this.mockGET.bind(this)
    });
  }

  mockPOST(_requestDescriptor: string) {
    if (_requestDescriptor.includes('childAdditions')) {
      return generateResponse(() => this.dashboard);
    }
    return null;
  }

  mockPUT(_requestDescriptor: string) {
    if (/\/\d+/.test(_requestDescriptor)) {
      return generateResponse(() => this.dashboard);
    }
    return null;
  }

  private mockGET(_requestDescriptor: string) {
    return null;
  }
}
