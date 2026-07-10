import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'dashboards/responsive-layout',
      loadComponent: () =>
        import('./responsive-layout-dashboard.component').then(
          (m) => m.ResponsiveLayoutDashboardComponent,
        ),
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Responsive layout dashboard',
        path: '/dashboards/responsive-layout',
        icon: 'cogs',
        priority: 2,
        parent: 'Dashboards',
      }),
    ),
  ],
})
export class ResponsiveLayoutDashboardModule {}
