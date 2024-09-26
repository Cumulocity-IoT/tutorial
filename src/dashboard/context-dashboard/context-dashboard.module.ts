import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'dashboards/context',
      loadComponent: () =>
        import('./context-dashboard.component').then(m => m.ContextDashboardComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Context dashboard',
        path: '/dashboards/context',
        icon: 'th-list',
        priority: 0,
        parent: 'Dashboards'
      })
    )
  ]
})
export class ContextDashboardModule {}
