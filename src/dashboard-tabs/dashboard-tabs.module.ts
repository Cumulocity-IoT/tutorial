import { NgModule } from '@angular/core';
import { hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'dashboard-tabs/dashboardTabs',
      loadComponent: () => import('./dashboard-tabs.component').then(m => m.DashboardTabsComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        path: 'dashboard-tabs/dashboardTabs',
        label: 'Dashboard Tabs',
        icon: 'rocket',
        priority: 1000
      })
    )
  ]
})
export class DashboardTabsModule {}
