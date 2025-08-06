import { IFetchResponse } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { handleRequest } from '../utils/common';
import { Observable } from 'rxjs';

export class ProviderConfigurationsApiInterceptor implements HttpInterceptor {
  configurations = [
    { id: 'provider1', config: { username: 'user1', password: 'pass1' } },
    { id: 'provider2', config: { username: 'user2', password: 'pass2' } }
  ];

  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    return handleRequest(req, next, '/service/demo/providers/configuration', {
      GET: this.mockGET.bind(this),
      POST: this.mockPOST.bind(this),
      PUT: this.mockPUT.bind(this),
      DELETE: this.mockDELETE.bind(this)
    });
  }

  private async mockGET(_requestDescriptor: string) {
    return {
      status: 200,
      json: async () => this.configurations
    };
  }

  private async mockPOST(requestDescriptor: string) {
    const bodyStartIndex = requestDescriptor.indexOf('{');
    const body = bodyStartIndex !== -1 ? JSON.parse(requestDescriptor.slice(bodyStartIndex)) : {};
    this.configurations.push(body);
    return {
      status: 201,
      json: async () => body
    };
  }

  private async mockPUT(requestDescriptor: string) {
    const bodyStartIndex = requestDescriptor.indexOf('{');
    const body = bodyStartIndex !== -1 ? JSON.parse(requestDescriptor.slice(bodyStartIndex)) : {};
    const idx = this.configurations.findIndex(c => c.id === body.id);
    if (idx > -1) {
      this.configurations[idx] = body;
    }
    return {
      status: 200,
      json: async () => body
    };
  }

  private async mockDELETE(requestDescriptor: string) {
    const match = requestDescriptor.match(/\/configuration\/([^/]+)/);
    if (match) {
      const id = match[1];
      this.configurations = this.configurations.filter(c => c.id !== id);
    }
    return {
      status: 204,
      json: async () => ({})
    };
  }
}
