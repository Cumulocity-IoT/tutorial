import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const entityDetailNarrowFormExampleProviders = [
  hookRoute({
    path: 'entity-detail-narrow-form-example',
    loadComponent: () =>
      import('./entity-detail-narrow-form-example.component').then(
        (m) => m.EntityDetailNarrowFormExampleComponent,
      ),
  }),
  hookNavigator(
    new NavigatorNode({
      path: '/entity-detail-narrow-form-example',
      label: 'Inventory role (4-8)',
      icon: 'c8y-accounts',
      parent: 'Entity detail',
      priority: 20,
    }),
  ),
];
