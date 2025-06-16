import { hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';

export function provideProviderConfigurationIntroduction() {
  return [
    hookRoute({
      path: 'provider-configuration/introduction-example',
      loadComponent: () => import('./introduction.component').then(m => m.IntroductionComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Introduction',
        path: '/provider-configuration/introduction-example',
        icon: 'list-alt',
        priority: 3,
        parent: 'Provider configuration'
      })
    )
  ];
}
