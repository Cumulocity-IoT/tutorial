import { EnvironmentProviders, Provider } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

const root = new NavigatorNode({
  label: 'Split view',
  icon: 'th-list',
  priority: 200
});

root.add(
  new NavigatorNode({
    path: '/split-view/resizable',
    label: 'Basic example',
    icon: 'list'
  })
);

root.add(
  new NavigatorNode({
    path: '/split-view/fixed',
    label: 'Static example',
    icon: 'stop'
  })
);

root.add(
  new NavigatorNode({
    path: '/split-view/full-width',
    label: 'Single column example',
    icon: 'expand'
  })
);

export function provideSplitViewSamples(): (Provider | EnvironmentProviders)[] {
  return [
    hookRoute({
      path: 'split-view',
      loadChildren: () => import('./split-view-lazy.module').then(m => m.SplitViewLazyModule)
    }),
    hookNavigator(root)
  ];
}
