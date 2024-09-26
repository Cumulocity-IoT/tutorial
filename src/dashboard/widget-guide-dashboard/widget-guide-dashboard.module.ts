import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'dashboards/widget-guide-dashboard',
      loadComponent: () =>
        import('./widget-guide-dashboard.component').then(m => m.WidgetGuideDashboardComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Widget guide dashboard example',
        path: '/dashboards/widget-guide-dashboard',
        icon: 'th-large',
        priority: -6,
        parent: 'Dashboards'
      })
    )
  ]
})
export class WidgetGuideDashboardModule {}
