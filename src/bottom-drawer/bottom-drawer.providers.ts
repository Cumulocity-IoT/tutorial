import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const bottomDrawerExampleModuleProviders = [
  hookRoute({
    path: 'bottom-drawer',
    loadComponent: () =>
      import('./bottom-drawer-example.component').then(m => m.BottomDrawerExampleComponent)
  }),
  hookNavigator(
    new NavigatorNode({
      label: 'Bottom drawer',
      path: '/bottom-drawer',
      icon: 'th-list',
      priority: 0
    })
  )
];
