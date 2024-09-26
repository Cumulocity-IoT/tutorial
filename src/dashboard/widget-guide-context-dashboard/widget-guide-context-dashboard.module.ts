import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'dashboards/widget-guide-context-dashboard',
      loadComponent: () =>
        import('./widget-guide-context-dashboard.component').then(
          m => m.WidgetGuideContextDashboardComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Widget guide context dashboard example',
        path: '/dashboards/widget-guide-context-dashboard',
        icon: 'th-large',
        priority: -6,
        parent: 'Dashboards'
      })
    )
  ]
})
export class WidgetGuideContextDashboardModule {}
