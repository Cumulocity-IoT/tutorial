import { EnvironmentProviders, Provider, inject, provideAppInitializer } from '@angular/core';
import { ApiService } from '@c8y/ngx-components/api';
import { ClientInterceptorService } from './client-interceptor.service';

export function provideClientInterceptorSample() {
  return [
    provideAppInitializer(() => {
      const initializerFn = ((apiService: ApiService, interceptor: ClientInterceptorService) => {
        return () => {
          apiService.addInterceptor(interceptor, 'tutorialAppDemoInterceptor');
        };
      })(inject(ApiService), inject(ClientInterceptorService));
      return initializerFn();
    })
  ] satisfies (Provider | EnvironmentProviders)[];
}
