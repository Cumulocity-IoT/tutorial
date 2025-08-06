import { IFetchResponse } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { handleRequest } from '../utils/common';
import { Observable } from 'rxjs';

export class ProviderDefinitionsApiInterceptor implements HttpInterceptor {
  providers = [
    { id: 'provider1', name: 'Provider One' },
    { id: 'provider2', name: 'Provider Two' }
  ];

  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    return handleRequest(req, next, '/service/demo/providers/definitions', {
      GET: this.mockGET.bind(this)
    });
  }

  private async mockGET(_requestDescriptor: string) {
    return {
      status: 200,
      json: async () => this.providers
    };
  }
}
