import { EnvironmentProviders, Provider } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

export function provideIconPanelExample(): (Provider | EnvironmentProviders)[] {
  return [
    hookRoute({
      path: 'icon-panel',
      loadChildren: () => import('./icon-panel-example.module').then(m => m.IconPanelExampleModule)
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/icon-panel',
        label: 'Icon panel',
        icon: 'rectangular',
        priority: 250
      })
    )
  ];
}
