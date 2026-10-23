import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const entityDetailWideFormExampleProviders = [
  hookRoute({
    path: 'entity-detail-wide-form-example',
    loadComponent: () =>
      import('./entity-detail-wide-form-example.component').then(
        (m) => m.EntityDetailWideFormExampleComponent,
      ),
  }),
  hookNavigator(
    new NavigatorNode({
      path: '/entity-detail-wide-form-example',
      label: 'Global role (8-4)',
      icon: 'c8y-accounts',
      parent: 'Entity detail',
      priority: 10,
    }),
  ),
];
