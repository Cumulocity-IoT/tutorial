import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const fullPageListExampleProviders = [
  hookRoute({
    path: 'full-page-list-example',
    loadComponent: () =>
      import('./full-page-list-example.component').then((m) => m.FullPageListExampleComponent),
  }),
  hookNavigator(
    new NavigatorNode({
      path: '/full-page-list-example',
      label: 'Data grid',
      icon: 'table',
      parent: 'Full-page list',
      priority: 40,
    }),
  ),
];
