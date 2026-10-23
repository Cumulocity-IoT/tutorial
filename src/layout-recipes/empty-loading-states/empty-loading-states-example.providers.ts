import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const emptyLoadingStatesExampleProviders = [
  hookRoute({
    path: 'empty-loading-states-example',
    loadComponent: () =>
      import('./empty-loading-states-example.component').then(
        (m) => m.EmptyLoadingStatesExampleComponent,
      ),
  }),
  hookNavigator(
    new NavigatorNode({
      path: '/empty-loading-states-example',
      label: 'Empty & loading states',
      icon: 'disconnected',
      parent: 'Layout recipes',
      priority: 50,
    }),
  ),
];
