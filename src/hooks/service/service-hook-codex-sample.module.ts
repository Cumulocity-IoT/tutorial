import { NgModule } from '@angular/core';
import { ServiceHookModule } from './client/service-hook.module';
import { CounterHookModule } from './counter/counter.module';

@NgModule({
  imports: [ServiceHookModule, CounterHookModule]
})
/**
 * `codex-tutorial-example` component supports a single module only, hence the module providing the service (CounterHookModule)
 * and the one consuming the service (ServiceHookModule) need to be combined in a single module.
 * In the general case, both modules above can be added as remotes separately.
 */
export class ServiceHookCodexSampleModule {}
