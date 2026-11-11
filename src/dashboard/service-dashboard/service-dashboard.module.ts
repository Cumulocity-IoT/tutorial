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
        path: 'service-dashboard',
        context: ViewContext.Service,
        loadComponent: () =>
          import('./service-dashboard.component').then((m) => m.ServiceDashboardComponent),
        // Attaches the "Dashboard settings" drawer tabs and their aux-outlet routes.
        rootContext: ViewContext.Dashboard,
      },
      {
        path: 'dashboards/service-dashboard',
        canActivate: [
          () =>
            inject(ViewContextRedirectService).redirectToFirstItemOf(
              ViewContext.Service,
              'service-dashboard',
            ),
        ],
        component: EmptyComponent,
      },
    ]),
    hookNavigator({
      label: 'Service dashboard',
      path: '/dashboards/service-dashboard',
      icon: 'th-list',
      priority: -2,
      parent: 'Dashboards',
    }),
  ],
})
export class ServiceDashboardModule {}
