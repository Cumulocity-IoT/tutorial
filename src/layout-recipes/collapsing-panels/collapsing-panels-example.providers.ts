import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const collapsingPanelsExampleProviders = [
  hookRoute({
    path: 'collapsing-panels-example',
    loadComponent: () =>
      import('./collapsing-panels-example.component').then(
        (m) => m.CollapsingPanelsExampleComponent,
      ),
  }),
  hookNavigator(
    new NavigatorNode({
      path: '/collapsing-panels-example',
      label: 'Collapsing panels',
      icon: 'split-horizontal',
      parent: 'Layout recipes',
      priority: 70,
    }),
  ),
];
