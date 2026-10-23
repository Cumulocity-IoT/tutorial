import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const applicationListExampleProviders = [
  hookRoute({
    path: 'application-list-example',
    loadComponent: () =>
      import('./application-list-example.component').then((m) => m.ApplicationListExampleComponent),
  }),
  hookNavigator(
    new NavigatorNode({
      path: '/application-list-example',
      label: 'Card grid-list',
      icon: 'th',
      parent: 'Full-page list',
      priority: 10,
    }),
  ),
];
