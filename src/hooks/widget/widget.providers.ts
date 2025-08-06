import { hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';

export const widgetHookProviders = [
  hookRoute({
    path: 'hooks/widget',
    loadComponent: () =>
      import('./context-dashboard.component').then(m => m.ContextDashboardComponent)
  }),
  hookNavigator(
    new NavigatorNode({
      priority: 75,
      path: 'hooks/widget',
      icon: 'edit',
      label: 'Widget',
      parent: 'Hooks'
    })
  )
];
