import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'time-picker',
      loadComponent: () =>
        import('./time-picker-example.component').then(m => m.TimePickerExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Time picker',
        path: '/time-picker',
        icon: 'realtime',
        priority: 10
      })
    )
  ]
})
export class TimePickerExampleModule {}
