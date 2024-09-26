import { IFetchResponse } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { generateResponse, handleRequest } from '../utils/common';
import { Observable } from 'rxjs';
import { generateRandomMo } from '../../__mocks/utils/generators/managedObjects';
import { filterObjects } from '../utils/grid';

export class ServerSideDataGridInterceptor implements HttpInterceptor {
  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    return handleRequest(req, next, 'managedObjects', {
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
    const responseGenerators = this.getResponseGenerators();

    for (const urlPart in responseGenerators) {
      if (_requestDescriptor.includes(urlPart)) {
        const generatorResult = responseGenerators[urlPart]();
        if (generatorResult) {
          const filteredData = filterObjects(generatorResult.managedObjects, _requestDescriptor);
          return generateResponse(() => ({ managedObjects: filteredData }));
        }
      }
    }
    return null;
  }

  private getResponseGenerators() {
    return {
      pageSize: () => ({
        managedObjects: [...[...Array(25)].map(() => generateRandomMo())]
      })
    };
  }
}
