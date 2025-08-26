import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const propertiesSelectorDrawerExampleProviders = [
  hookRoute({
    path: 'selector/properties-selector-drawer-example',
    loadComponent: () =>
      import('./properties-selector-drawer.component').then(
        m => m.PropertiesSelectorDrawerExampleComponent
      )
  }),
  hookNavigator(
    new NavigatorNode({
      label: 'Properties selector drawer example',
      path: '/selector/properties-selector-drawer-example',
      icon: 'th-list',
      priority: 4
    })
  )
];
