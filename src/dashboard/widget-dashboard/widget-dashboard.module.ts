import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'dashboards/widget',
      loadComponent: () =>
        import('./widget-dashboard.component').then(m => m.WidgetDashboardComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Widget dashboard',
        path: '/dashboards/widget',
        icon: 'th-list',
        priority: 1,
        parent: 'Dashboards'
      })
    )
  ]
})
export class WidgetDashboardModule {}
