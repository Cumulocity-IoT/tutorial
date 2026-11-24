import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const dropdownFitViewportExampleProviders = [
  hookRoute({
    path: 'dropdown-fit-viewport-example',
    loadComponent: () =>
      import('./dropdown-fit-viewport-example.component').then(
        (m) => m.DropdownFitViewportExampleComponent,
      ),
  }),
  hookNavigator(
    new NavigatorNode({
      path: '/dropdown-fit-viewport-example',
      label: 'Dropdown fitted to the screen',
      icon: 'schedule1',
      priority: 10,
    }),
  ),
];
