import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'date-time-range',
      loadComponent: () =>
        import('./date-time-range-example.component').then(m => m.DateTimeRangeExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Date time range',
        path: '/date-time-range',
        icon: 'realtime',
        priority: 10
      })
    )
  ]
})
export class DateTimeRangeExampleModule {}
