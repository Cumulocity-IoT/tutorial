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
      id: '200'
    }
  });

  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    return handleRequest(req, next, 'inventory/managedObjects', {
      POST: this.mockPOST.bind(this),
      PUT: this.mockPUT.bind(this),
      GET: this.mockGET.bind(this)
    });
  }

  private mockPOST(_requestDescriptor: string) {
    if (_requestDescriptor.includes('childAdditions')) {
      return generateResponse(() => this.dashboard);
    }
    return null;
  }

  private mockPUT(_requestDescriptor: string) {
    if (/\/\d+/.test(_requestDescriptor)) {
      return generateResponse(() => this.dashboard);
    }
    return null;
  }

  private mockGET(_requestDescriptor: string) {
    return null;
  }
}
