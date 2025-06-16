import { hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';

const root = new NavigatorNode({
  label: 'Lazy loaded',
  icon: 'hourglass-start'
});

root.add(
  new NavigatorNode({
    path: '/lazy/one',
    label: 'One',
    icon: 'thermometer'
  })
);

root.add(
  new NavigatorNode({
    path: '/lazy/two',
    label: 'Two',
    icon: 'thermometer-3'
  })
);

export function provideLazySample() {
  return [
    /**
     * Angular Routes.
     * Within this array at least path (url) and components are linked.
     */
    hookRoute([
      {
        path: 'lazy',
        loadChildren: () => import('./lazy-loaded.module').then(m => m.LazyLoadedModule)
      }
    ]),
    hookNavigator(root)
  ];
}
