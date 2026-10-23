import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const narrowFormExampleProviders = [
  hookRoute({
    path: 'narrow-form-example',
    loadComponent: () =>
      import('./narrow-form-example.component').then((m) => m.NarrowFormExampleComponent),
  }),
  hookNavigator(
    new NavigatorNode({
      path: '/narrow-form-example',
      label: 'Narrow form',
      icon: 'form',
      parent: 'Layout recipes',
      priority: 60,
    }),
  ),
];
