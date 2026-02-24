import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const bottomDrawerStackedExampleModuleProviders = [
  hookRoute({
    path: 'bottom-drawer-stacked',
    loadComponent: () =>
      import('./bottom-drawer-stacked-example.component').then(
        m => m.BottomDrawerStackedExampleComponent
      )
  }),
  hookNavigator(
    new NavigatorNode({
      label: 'Bottom drawer stacked',
      path: '/bottom-drawer-stacked',
      icon: 'th-list',
      priority: 0
    })
  )
];
