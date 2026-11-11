import { NgModule } from '@angular/core';
import { NavigatorNode, ViewContext, hookNavigator, hookRoute } from '@c8y/ngx-components';
import { ContextDashboardModule as C8yContextDashboardModule } from '@c8y/ngx-components/context-dashboard';

@NgModule({
  // Imported eagerly so the "Dashboard settings" drawer routes register at bootstrap.
  imports: [C8yContextDashboardModule],
  providers: [
    hookRoute({
      path: 'dashboards/context',
      loadComponent: () =>
        import('./context-dashboard.component').then((m) => m.ContextDashboardComponent),
      // Attaches the "Dashboard settings" drawer tabs and their aux-outlet routes.
      rootContext: ViewContext.Dashboard,
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Context dashboard',
        path: '/dashboards/context',
        icon: 'th-list',
        priority: 0,
        parent: 'Dashboards',
      }),
    ),
  ],
})
export class ContextDashboardModule {}
