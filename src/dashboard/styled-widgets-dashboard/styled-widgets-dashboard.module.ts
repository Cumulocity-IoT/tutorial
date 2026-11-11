import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'dashboards/styled-widgets',
      loadComponent: () =>
        import('./styled-widgets-dashboard.component').then(
          (m) => m.StyledWidgetsDashboardComponent,
        ),
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Styled widgets dashboard',
        path: '/dashboards/styled-widgets',
        icon: 'paint-brush',
        priority: 1,
        parent: 'Dashboards',
      }),
    ),
  ],
})
export class StyledWidgetsDashboardModule {}
