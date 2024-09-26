import { IFetchResponse } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { generateResponse, handleRequest } from '../utils/common';
import { Observable } from 'rxjs';
import { generateDevice } from '../utils/generators/managedObjects';
import { filterObjects } from '../utils/grid';

export class ListsInterceptor implements HttpInterceptor {
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

  private async mockGET(_requestDescriptor: string) {
    // extra long timeout, to show the usage of c8yFor
    await new Promise(r => setTimeout(r, 500));

    const responseGenerators = this.getResponseGenerators();

    for (const urlPart in responseGenerators) {
      if (_requestDescriptor.includes(urlPart)) {
        const pageSize = _requestDescriptor.match(/\"pageSize\"\:(\d+)/)
          ? parseInt(_requestDescriptor.match(/\"pageSize\"\:(\d+)/)[1])
          : null;

        const generatorResult = responseGenerators[urlPart](pageSize);
        if (generatorResult) {
          const filteredData = filterObjects(generatorResult.managedObjects, _requestDescriptor);

          const currentPage = _requestDescriptor.match(/\"currentPage\"\:(\d+)/)
            ? parseInt(_requestDescriptor.match(/\"currentPage\"\:(\d+)/)[1])
            : null;

          return generateResponse(
            () => ({
              managedObjects: filteredData,
              ...(!!currentPage && currentPage !== 30 && { next: `currentPage=${currentPage + 1}` })
            }),
            {
              totalPages: 30,
              ...(!!pageSize && { pageSize }),
              ...(!!currentPage && { currentPage }),
              ...(!!currentPage && currentPage !== 30 && { next: `currentPage=${currentPage + 1}` })
            }
          );
        }
      }
    }
    return null;
  }

  private getResponseGenerators() {
    return {
      pageSize: pageSize => ({
        managedObjects: [...[...Array(pageSize || 10)].map(() => generateDevice())]
      })
    };
  }
}
