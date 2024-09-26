import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/alarm-event-selector-example',
      loadComponent: () =>
        import('./alarm-event-selector.component').then(m => m.AlarmEventSelectorExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'alarm event selector example',
        path: '/selector/alarm-event-selector-example',
        icon: 'th-list',
        priority: 15
      })
    )
  ]
})
export class AlarmEventSlectorExampleModule {}
