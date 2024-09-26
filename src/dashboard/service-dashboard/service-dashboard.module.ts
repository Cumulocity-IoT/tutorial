import { NgModule, inject } from '@angular/core';
import { EmptyComponent, ViewContext, hookNavigator, hookRoute } from '@c8y/ngx-components';
import { ViewContextRedirectService } from '../../redirect-to-last-route/view-context-redirect.service';

@NgModule({
  providers: [
    hookRoute([
      {
        path: 'service-dashboard',
        context: ViewContext.Service,
        loadComponent: () =>
          import('./service-dashboard.component').then(m => m.ServiceDashboardComponent)
      },
      {
        path: 'dashboards/service-dashboard',
        canActivate: [
          () =>
            inject(ViewContextRedirectService).redirectToFirstItemOf(
              ViewContext.Service,
              'service-dashboard'
            )
        ],
        component: EmptyComponent
      }
    ]),
    hookNavigator({
      label: 'Service dashboard',
      path: '/dashboards/service-dashboard',
      icon: 'th-list',
      priority: -2,
      parent: 'Dashboards'
    })
  ]
})
export class ServiceDashboardModule {}
