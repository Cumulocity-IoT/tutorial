import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'dashboards/min-size',
      loadComponent: () =>
        import('./min-size-dashboard.component').then((m) => m.MinSizeDashboardComponent),
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Minimum widget size dashboard',
        path: '/dashboards/min-size',
        icon: 'cogs',
        priority: 2,
        parent: 'Dashboards',
      }),
    ),
  ],
})
export class MinSizeDashboardModule {}
