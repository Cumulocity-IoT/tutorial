import { IFetchResponse } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { generateResponse, handleRequest } from '../utils/common';
import { Observable } from 'rxjs';
import { generateDevice } from '../utils/generators/managedObjects';

export class BoilerplateInterceptor implements HttpInterceptor {
  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    return handleRequest(req, next, 'inventory/managedObjects', {
      POST: this.mockPOST.bind(this),
      PUT: this.mockPUT.bind(this),
      GET: this.mockGET.bind(this)
    });
  }

  mockPOST(_requestDescriptor: string) {
    return null;
  }

  mockPUT(_requestDescriptor: string) {
    return null;
  }

  private mockGET(_requestDescriptor: string) {
    // TODO: ask Jan about clusters in the map.
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
      true: () => ({
        managedObjects: [...[...Array(1)].map(() => generateDevice())],
        statistics: {
          totalPages: 201,
          pageSize: 1,
          currentPage: 1
        }
      }),
      'has(c8y_Position)': () => ({
        managedObjects: [...[...Array(201)].map(() => generateDevice())]
      })
    };
  }
}
