import { IFetchResponse } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { Observable } from 'rxjs';
import { generateResponse, handleRequest } from '../utils/common';
import { generateDashboard } from '../../__mocks/utils/generators/managedObjects';

export class ContextDashboardInterceptor implements HttpInterceptor {
  dashboard = generateDashboard({
    device: { id: '12345', name: 'Demo Sensor Device' }
  });

  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    return handleRequest(req, next, 'inventory/managedObjects', {
      POST: this.mockPOST.bind(this),
      PUT: this.mockPUT.bind(this),
      GET: this.mockGET.bind(this)
    });
  }

  private mockPOST(_requestDescriptor: string) {
    return generateResponse(() => this.dashboard);
  }

  private mockPUT(_requestDescriptor: string) {
    return generateResponse(() => this.dashboard);
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
        managedObjects: [this.dashboard]
      })
    };
  }
}
