import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'dashboards/free-positioning',
      loadComponent: () =>
        import('./free-positioning-dashboard.component').then(
          (m) => m.FreePositioningDashboardComponent,
        ),
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Free positioning dashboard',
        path: '/dashboards/free-positioning',
        icon: 'cogs',
        priority: 2,
        parent: 'Dashboards',
      }),
    ),
  ],
})
export class FreePositioningDashboardModule {}
