import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const operationsListExampleProviders = [
  hookRoute({
    path: 'operations-list-example',
    loadComponent: () =>
      import('./operations-list-example.component').then((m) => m.OperationsListExampleComponent),
  }),
  hookNavigator(
    new NavigatorNode({
      path: '/operations-list-example',
      label: 'Timeline list',
      icon: 'clock-o',
      parent: 'Full-page list',
      priority: 20,
    }),
  ),
];
