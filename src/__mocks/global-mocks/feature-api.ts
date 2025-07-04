import { IFetchResponse } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { handleRequest } from '../utils/common';
import { Observable } from 'rxjs';

const LOCAL_STORAGE_KEY = 'previewFeatureState';

export class FeatureApiInterceptor implements HttpInterceptor {
  features = [
    {
      active: localStorage.getItem(LOCAL_STORAGE_KEY),
      phase: 'PUBLIC_PREVIEW',
      key: 'preview-feature-key',
      strategy: 'TENANT'
    }
  ];

  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    return handleRequest(req, next, '/features', {
      POST: this.mockPOST.bind(this),
      PUT: this.mockPUT.bind(this),
      GET: this.mockGET.bind(this)
    });
  }

  mockPOST(_requestDescriptor: string) {
    return null;
  }

  mockPUT(requestDescriptor: string) {
    const match = requestDescriptor.match(/\/features\/([^/]+)\/by-tenant/);
    if (match) {
      const key = match[1];
      const bodyStartIndex = requestDescriptor.indexOf('{');
      const body = bodyStartIndex !== -1 ? JSON.parse(requestDescriptor.slice(bodyStartIndex)) : {};
      const feature = this.features.find(f => f.key === key);
      if (feature) {
        feature.active = body.active;
        localStorage.setItem(LOCAL_STORAGE_KEY, String(body.active));
      }
    }

    return {
      status: 200,
      json: async () => this.features
    };
  }

  private async mockGET(_requestDescriptor: string) {
    return {
      status: 200,
      json: async () => this.features
    };
  }
}
