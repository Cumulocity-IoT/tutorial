import { IFetchResponse } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { filterObjectBySearchText, filterObjects } from '../utils/grid';
import { generateResponse, handleRequest } from '../utils/common';
import { Observable } from 'rxjs';
import { generateDevice } from '../../__mocks/utils/generators/managedObjects';

export class DeviceDataGridInterceptor implements HttpInterceptor {
  // Check handleTotalPagesRequest
  private totalPages = 100;
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
  private mockGET(_requestDescriptor: string, statistics) {
    const mockedQueryStringParameters = this.getMockedQueryStringParameters();

    for (const urlPart in mockedQueryStringParameters) {
      if (_requestDescriptor.includes(urlPart)) {
        const generatorResult = mockedQueryStringParameters[urlPart];
        if (generatorResult) {
          if (statistics?.pageSize === 1) {
            return this.handleTotalPagesRequest(statistics);
          }
          return this.handleDataRequest(_requestDescriptor, statistics);
        }
      }
    }
    return null;
  }

  // Sets the totalPages number to 100. Enables pagination in the device grid.
  // The device grid needs to know the total number of items.
  private handleTotalPagesRequest(statistics) {
    statistics.totalPages = this.totalPages;
    return generateResponse(
      () => ({
        managedObjects: [],
        ...(statistics?.next && { next: statistics.next.toString() })
      }),
      statistics
    );
  }

  // Handles the data request. Returns data that populates the device grid.
  private handleDataRequest(_requestDescriptor, statistics) {
    // statistics?.pageSize depends on the "Items per page" dropdown, where pageSize can be set to 25, 50, or 100.
    const devices = [...Array(statistics?.pageSize || 25)].map(() => generateDevice());

    const filteredDevices = filterObjects(devices, _requestDescriptor);

    const filteredDevicesByTextSearch = filterObjectBySearchText(
      filteredDevices,
      _requestDescriptor
    );
    return generateResponse(
      () => ({
        managedObjects: [...filteredDevicesByTextSearch],
        ...(statistics?.next && { next: statistics.next.toString() })
      }),
      statistics
    );
  }

  private getMockedQueryStringParameters() {
    return {
      // Mock only requests that include a `pageSize` parameter.
      pageSize: true
    };
  }
}
