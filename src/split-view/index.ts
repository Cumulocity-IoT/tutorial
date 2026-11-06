import { EnvironmentProviders, Provider } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

const root = new NavigatorNode({
  label: 'Split view',
  icon: 'th-list',
  priority: 200,
});

root.add(
  new NavigatorNode({
    path: '/split-view/resizable',
    label: 'Basic example',
    icon: 'list',
  }),
);

root.add(
  new NavigatorNode({
    path: '/split-view/fixed',
    label: 'Static example',
    icon: 'stop',
  }),
);

root.add(
  new NavigatorNode({
    path: '/split-view/full-width',
    label: 'Single column example',
    icon: 'expand',
  }),
);

root.add(
  new NavigatorNode({
    path: '/split-view/narrow-container',
    label: 'Narrow container example',
    icon: 'compress',
  }),
);

root.add(
  new NavigatorNode({
    path: '/split-view/selection',
    label: 'Selection example',
    icon: 'check-square',
  }),
);

root.add(
  new NavigatorNode({
    path: '/split-view/details-layout',
    label: 'Details layout example',
    icon: 'window-maximize',
  }),
);

root.add(
  new NavigatorNode({
    path: '/split-view/empty-state',
    label: 'Empty states example',
    icon: 'inbox',
  }),
);

root.add(
  new NavigatorNode({
    path: '/split-view/standalone-list',
    label: 'Standalone list example',
    icon: 'list-alt',
  }),
);

export function provideSplitViewSamples(): (Provider | EnvironmentProviders)[] {
  return [
    hookRoute({
      path: 'split-view',
      loadChildren: () => import('./split-view-lazy.module').then((m) => m.SplitViewLazyModule),
    }),
    hookNavigator(root),
  ];
}
