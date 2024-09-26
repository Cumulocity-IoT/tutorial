import { IFetchResponse } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { Observable } from 'rxjs';
import { generateResponse, handleRequest } from '../utils/common';

export class MeasurementsInterceptor implements HttpInterceptor {
  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    return handleRequest(req, next, 'measurement/measurements', {
      POST: this.mockPOST.bind(this),
      PUT: this.mockPUT.bind(this),
      GET: this.mockGET.bind(this)
    });
  }

  private mockPOST(_requestDescriptor) {
    return null;
  }

  private mockPUT(_requestDescriptor) {
    return null;
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
      c8y_Battery: () => ({
        measurements: [
          {
            id: '10000',
            type: 'c8y_Battery',
            source: {
              id: '20000'
            },
            c8y_Battery: {
              Battery: {
                unit: '%',
                value: 67
              }
            }
          }
        ]
      })
    };
  }
}
