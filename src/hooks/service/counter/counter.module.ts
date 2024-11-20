import { NgModule } from '@angular/core';
import { hookService } from '@c8y/ngx-components';
import { CounterService } from './counter.service';

@NgModule({
  /**
   * To provide a service using `hookService`, you pass a key that clients will use to retrieve the service instance.
   * By extending the `ExtensionKeys` interface in the `CumulocityServiceRegistry` namespace, you declare the key for your service.
   * `hookService` then enforces type safety, ensuring only services that implement the corresponding interface can be provided for that key.
   */
  providers: [hookService('counter', CounterService)]
})
export class CounterHookModule {}
