import { NgModule } from '@angular/core';
import { hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    hookNavigator({
      label: 'Hooking via service',
      icon: 'holding-box',
      priority: -40,
      path: 'hooks/service-hook',
      parent: 'Hooks',
      // TODO: clarify why preventDuplicates is needed
      preventDuplicates: true
    }),
    hookRoute({
      path: 'hooks/service-hook',
      loadComponent: () =>
        import('./hook-with-service-example.component').then(m => m.HookWithServiceExampleComponent)
    })
  ]
})
export class HookStateModule {}
