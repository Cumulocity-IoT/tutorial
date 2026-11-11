import { NgModule } from '@angular/core';
import { NavigatorNode, ViewContext, hookNavigator, hookRoute } from '@c8y/ngx-components';
import { ContextDashboardModule } from '@c8y/ngx-components/context-dashboard';

@NgModule({
  // Imported eagerly so the "Dashboard settings" drawer routes register at bootstrap.
  imports: [ContextDashboardModule],
  providers: [
    hookRoute({
      path: 'dashboards/widget-guide-context-dashboard',
      loadComponent: () =>
        import('./widget-guide-context-dashboard.component').then(
          (m) => m.WidgetGuideContextDashboardComponent,
        ),
      // Attaches the "Dashboard settings" drawer tabs and their aux-outlet routes.
      rootContext: ViewContext.Dashboard,
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Widget guide context dashboard example',
        path: '/dashboards/widget-guide-context-dashboard',
        icon: 'th-large',
        priority: -6,
        parent: 'Dashboards',
      }),
    ),
  ],
})
export class WidgetGuideContextDashboardModule {}
