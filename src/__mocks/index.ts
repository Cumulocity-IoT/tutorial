export * from './mock.service';
export * from './mock.model';
export * from './mock.realtime';
export * from './mock.realtime-subject';
import { AppStateService, OptionsService, RealtimeSubjectService } from '@c8y/ngx-components';
import { InventoryInterceptor } from './global-mocks/inventory.interceptor';
import { MeasurementsInterceptor } from './global-mocks/measurements.interceptor';
import { API_MOCK_CONFIG, ApiMockConfig } from './mock.model';
import { RealtimeSubjectServiceWithMocking } from './mock.realtime';
import { ContextDashboardInterceptor } from './scoped-mocks/context-dashboard';
import { DeviceDataGridInterceptor } from './scoped-mocks/device-data-grid';
import { ListsInterceptor } from './scoped-mocks/lists';
import { NamedContextDashboardInterceptor } from './scoped-mocks/named-context-dashboard';
import { ServerSideDataGridInterceptor } from './scoped-mocks/server-side-data-grid';
import { ServiceDashboardInterceptor } from './scoped-mocks/service-dashboard';
import { TypeaheadInterceptor } from './scoped-mocks/typeahead';
import { MeasurementsSeriesInterceptor } from './scoped-mocks/measurement-series';
import { EnvironmentProviders, Provider, inject, provideAppInitializer } from '@angular/core';
import { MockService } from './mock.service';
import { IUser } from '@c8y/client';

export function provideAPIMock() {
  return [
    // TODO: ask Jan about mocking clusters maps/cluster
    // {
    //   provide: API_MOCK_CONFIG,
    //   useValue: {
    //     id: 'a-cluster-map-interceptor',
    //     path: 'maps/cluster',
    //     mockService: BoilerplateInterceptor,
    //     debug: true
    //   } as ApiMockConfig,
    //   multi: true
    // },
    {
      provide: API_MOCK_CONFIG,
      useValue: {
        id: 'a-datapoints-export-selector-interceptor',
        path: 'datapoints-export-selector-example',
        mockService: MeasurementsSeriesInterceptor,
        debug: true
      } as ApiMockConfig,
      multi: true
    },
    {
      provide: API_MOCK_CONFIG,
      useValue: {
        id: 'a-service-dashboard-interceptor',
        path: 'service-dashboard',
        mockService: ServiceDashboardInterceptor,
        debug: true
      } as ApiMockConfig,
      multi: true
    },
    {
      provide: API_MOCK_CONFIG,
      useValue: {
        id: 'list-group-interceptor',
        path: 'lists',
        mockService: ListsInterceptor,
        debug: true
      } as ApiMockConfig,
      multi: true
    },
    {
      provide: API_MOCK_CONFIG,
      useValue: {
        id: 'for-of-interceptor',
        path: 'for-of',
        mockService: ListsInterceptor,
        debug: true
      } as ApiMockConfig,
      multi: true
    },
    {
      provide: API_MOCK_CONFIG,
      useValue: {
        id: 'typeahaed-interceptor',
        path: 'typeahead',
        mockService: TypeaheadInterceptor,
        debug: true
      } as ApiMockConfig,
      multi: true
    },
    {
      provide: API_MOCK_CONFIG,
      useValue: {
        id: 'server-side-data-grid-interceptor',
        path: 'server-grid-example',
        mockService: ServerSideDataGridInterceptor
      } as ApiMockConfig,
      multi: true
    },
    {
      provide: API_MOCK_CONFIG,
      useValue: {
        id: 'device-data-grid-interceptor',
        path: 'device-grid-example',
        mockService: DeviceDataGridInterceptor
      } as ApiMockConfig,
      multi: true
    },
    {
      provide: API_MOCK_CONFIG,
      useValue: {
        id: 'scoped-dashboard-context-interceptor',
        path: 'dashboards/context',
        mockService: ContextDashboardInterceptor
      } as ApiMockConfig,
      multi: true
    },
    {
      provide: API_MOCK_CONFIG,
      useValue: {
        id: 'scoped-dashboard-context-interceptor-2',
        path: 'dashboards/widget-guide-context-dashboard',
        mockService: ContextDashboardInterceptor
      } as ApiMockConfig,
      multi: true
    },
    {
      provide: API_MOCK_CONFIG,
      useValue: {
        path: 'named-context',
        // The interceptors are sorted by their ID, so the scoped interceptors should be before the global ones.
        id: 'named-context-interceptor-example',
        mockService: NamedContextDashboardInterceptor
      } as ApiMockConfig,
      multi: true
    },
    {
      provide: API_MOCK_CONFIG,
      useValue: {
        // The interceptors are sorted by their ID, so the scoped interceptors should be before the global ones.
        id: 'z-global-inventory-interceptor',
        mockService: InventoryInterceptor
      } as ApiMockConfig,
      multi: true
    },
    {
      provide: API_MOCK_CONFIG,
      useValue: {
        // The interceptors are sorted by their ID, so the scoped interceptors should be before the global ones.
        id: 'z-global-measurementsInterceptor-interceptor',
        mockService: MeasurementsInterceptor
      } as ApiMockConfig,
      multi: true
    },
    {
      provide: RealtimeSubjectService,
      useExisting: RealtimeSubjectServiceWithMocking
    },
    provideAppInitializer(() => {
      const initializerFn = ((
        _service: MockService,
        appStateService: AppStateService,
        options: OptionsService
      ) => {
        return () => {
          if (options.get('noLogin', false)) {
            appStateService.currentUser.next({
              id: 'NO_LOGIN',
              userName: 'noLogin',
              displayName: 'noLogin'
            } as IUser);
          }
        };
      })(inject(MockService), inject(AppStateService), inject(OptionsService));
      return initializerFn();
    })
  ] satisfies (Provider | EnvironmentProviders)[];
}
