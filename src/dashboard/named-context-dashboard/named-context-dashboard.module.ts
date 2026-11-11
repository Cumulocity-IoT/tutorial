import { NgModule, inject } from '@angular/core';
import { EmptyComponent, ViewContext, hookNavigator, hookRoute } from '@c8y/ngx-components';
import { ContextDashboardModule } from '@c8y/ngx-components/context-dashboard';
import { ViewContextRedirectService } from '../../redirect-to-last-route/view-context-redirect.service';

@NgModule({
  // Imported eagerly so the "Dashboard settings" drawer routes register at bootstrap.
  imports: [ContextDashboardModule],
  providers: [
    hookRoute([
      {
        label: 'Named context dashboard',
        icon: 'info',
        path: 'named-context',
        context: ViewContext.Device,
        loadComponent: () =>
          import('./named-context-dashboard.component').then(
            (m) => m.NamedContextDashboardComponent,
          ),
        // Attaches the "Dashboard settings" drawer tabs and their aux-outlet routes.
        rootContext: ViewContext.Dashboard,
      },
      {
        path: 'dashboards/named-context',
        canActivate: [
          () =>
            inject(ViewContextRedirectService).redirectToFirstItemOf(
              ViewContext.Device,
              'named-context',
            ),
        ],
        component: EmptyComponent,
      },
    ]),
    hookNavigator({
      label: 'Named-context dashboard',
      icon: 'list',
      priority: 1,
      path: `/dashboards/named-context`,
      parent: 'Dashboards',
    }),
  ],
})
export class NamedContextDashboardModule {}
