import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'dashboards/custom',
      loadComponent: () =>
        import('./custom-dashboard.component').then(m => m.CustomDashboardComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Custom dashboard',
        path: '/dashboards/custom',
        icon: 'th-large',
        priority: 3,
        parent: 'Dashboards'
      })
    )
  ]
})
export class CustomDashboardModule {}
