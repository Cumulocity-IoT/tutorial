import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const trustedCertificateListExampleProviders = [
  hookRoute({
    path: 'trusted-certificate-list-example',
    loadComponent: () =>
      import('./trusted-certificate-list-example.component').then(
        (m) => m.TrustedCertificateListExampleComponent,
      ),
  }),
  hookNavigator(
    new NavigatorNode({
      path: '/trusted-certificate-list-example',
      label: 'List group (collapsible)',
      icon: 'list',
      parent: 'Full-page list',
      priority: 30,
    }),
  ),
];
