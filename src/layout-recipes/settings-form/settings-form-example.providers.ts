import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const settingsFormExampleProviders = [
  hookRoute({
    path: 'settings-form-example',
    loadComponent: () =>
      import('./settings-form-example.component').then((m) => m.SettingsFormExampleComponent),
  }),
  hookNavigator(
    new NavigatorNode({
      path: '/settings-form-example',
      label: 'Settings form',
      icon: 'settings',
      parent: 'Layout recipes',
      priority: 90,
    }),
  ),
];
