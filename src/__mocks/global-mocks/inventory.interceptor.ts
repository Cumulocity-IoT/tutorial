import { IFetchResponse } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { Observable } from 'rxjs';
import { generateResponse, handleRequest } from '../utils/common';
import {
  generateUserPreferences,
  generateRealtimeDeviceMO,
  generateRandomMo,
  generateDevice,
  generateSubGroup,
  generateAsset,
  generateGroup,
  generateAssetType
} from '../../__mocks/utils/generators/managedObjects';

export class InventoryInterceptor implements HttpInterceptor {
  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    return handleRequest(req, next, 'inventory/managedObjects', {
      POST: this.mockPOST.bind(this),
      PUT: this.mockPUT.bind(this),
      GET: this.mockGET.bind(this)
    });
  }

  private mockPOST(_requestDescriptor: string) {
    if (_requestDescriptor.includes('c8y_UserPreference')) {
      return generateResponse(() => generateUserPreferences());
    }
    return null;
  }

  private mockPUT(_requestDescriptor: string) {
    return null;
  }

  private async mockGET(_requestDescriptor: string) {
    /**
     * Workaround. Leaflet is lazy loaded. Adding mocked assets too fast leads to not loaded markers.
     */
    await new Promise(r => setTimeout(r, 300));

    const responseGenerators = this.getResponseGenerators(_requestDescriptor);
    for (const urlPart in responseGenerators) {
      if (_requestDescriptor.includes(urlPart)) {
        const generatorResult = responseGenerators[urlPart]();
        if (generatorResult) {
          return generateResponse(() => generatorResult);
        }
      }
    }

    /**
     * Intercept request to /inventory/managedObjects/<moId>
     */
    if (/\/\d+/.test(_requestDescriptor)) {
      return generateResponse(() => generateDevice());
    }
    return null;
  }

  private getResponseGenerators(_requestDescriptor: string) {
    return {
      c8y_DeviceGroup: () => ({
        managedObjects: [...[...Array(10)].map(() => generateSubGroup())]
      }),
      c8y_DeviceSubgroup: () => ({
        managedObjects: [generateSubGroup()]
      }),
      'has(c8y_IsDeviceGroup)': () => ({
        managedObjects: [...[...Array(5)].map(() => generateGroup())]
      }),
      'has(c8y_Position)': () => ({
        managedObjects: [generateRealtimeDeviceMO()]
      }),
      'has(c8y_IsDevice)': () => ({
        managedObjects: [...[...Array(5)].map(() => generateDevice())]
      }),
      childAssets: () => ({
        references: [
          ...[...Array(3)].map(() => ({
            managedObject: generateRandomMo()
          }))
        ]
      }),
      childDevices: () => ({
        references: []
      }),
      childAdditions: () => ({
        references: []
      }),
      c8y_Dashboard: () => ({
        managedObjects: []
      }),
      c8y_IsAssetType: () => ({
        managedObjects: [generateAssetType()]
      }),
      c8yAssetTypesCacheInvalidator: () => ({
        managedObjects: [generateRandomMo()]
      }),
      c8y_IsDeviceGroup: () => ({
        managedObjects: [
          ...[...Array(5)].map(() => (Math.random() < 0.5 ? generateSubGroup() : generateAsset()))
        ]
      }),
      c8y_IsDevice: () =>
        _requestDescriptor.includes('"onlyRoots":true') &&
        !_requestDescriptor.includes('c8y_IsDeviceGroup')
          ? {
              managedObjects: [...[...Array(2)].map(() => generateDevice())]
            }
          : null,
      supportedMeasurements: () => ({
        c8y_SupportedMeasurements: ['c8y_Battery']
      }),
      supportedSeries: () => ({
        c8y_SupportedSeries: ['c8y_Battery.Battery']
      }),
      c8y_Kpi: () => ({
        managedObjects: []
      }),
      kpis: () => ({
        managedObjects: []
      }),
      c8y_Battery: () => ({
        id: '100000',
        type: 'c8y_Battery',
        source: {
          id: '200000'
        },
        c8y_Battery: {
          Battery: {
            unit: '%',
            value: 67
          }
        }
      }),
      c8y_Service: () => ({
        managedObjects: [generateDevice()]
      }),
      gainsightBotEnabled: () => ({
        managedObjects: []
      }),
      language: () => ({
        managedObjects: [generateUserPreferences()]
      })
    };
  }
}
