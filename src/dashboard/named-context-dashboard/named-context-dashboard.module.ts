import { NgModule, inject } from '@angular/core';
import { EmptyComponent, ViewContext, hookNavigator, hookRoute } from '@c8y/ngx-components';
import { ViewContextRedirectService } from '../../redirect-to-last-route/view-context-redirect.service';

@NgModule({
  providers: [
    hookRoute([
      {
        label: 'Named context Dashboard',
        icon: 'info',
        path: 'named-context',
        context: ViewContext.Device,
        loadComponent: () =>
          import('./named-context-dashboard.component').then(m => m.NamedContextDashboardComponent)
      },
      {
        path: 'dashboards/named-context',
        canActivate: [
          () =>
            inject(ViewContextRedirectService).redirectToFirstItemOf(
              ViewContext.Device,
              'named-context'
            )
        ],
        component: EmptyComponent
      }
    ]),
    hookNavigator({
      label: 'Named-context dashboard',
      icon: 'list',
      priority: 1,
      path: `/dashboards/named-context`,
      parent: 'Dashboards'
    })
  ]
})
export class NamedContextDashboardModule {}
