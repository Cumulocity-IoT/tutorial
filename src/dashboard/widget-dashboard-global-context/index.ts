import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export function provideWidgetDashboardGlobalContext() {
  return [
    hookRoute({
      path: 'dashboards/widget-global-context',
      loadComponent: () =>
        import('./widget-dashboard-global-context.component').then(
          (m) => m.WidgetDashboardGlobalContextComponent,
        ),
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Widget dashboard with global context',
        path: '/dashboards/widget-global-context',
        icon: 'th-large',
        priority: 1,
        parent: 'Dashboards',
      }),
    ),
  ];
}
