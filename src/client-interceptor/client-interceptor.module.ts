import { NgModule } from '@angular/core';
import { ApiService, DataModule } from '@c8y/ngx-components/api';
import { ClientInterceptorService } from './client-interceptor.service';

@NgModule({
  imports: [DataModule]
})
export class ClientInterceptorModule {
  constructor(apiService: ApiService, interceptor: ClientInterceptorService) {
    apiService.addInterceptor(interceptor, 'tutorialAppDemoInterceptor');
  }
}
