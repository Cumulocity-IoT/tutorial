import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const entityDetailExampleProviders = [
  hookRoute({
    path: 'entity-detail-example',
    loadComponent: () =>
      import('./entity-detail-example.component').then((m) => m.EntityDetailExampleComponent),
  }),
  hookNavigator(
    new NavigatorNode({
      path: '/entity-detail-example',
      label: 'User (equal columns)',
      icon: 'user',
      parent: 'Entity detail',
      priority: 30,
    }),
  ),
];
