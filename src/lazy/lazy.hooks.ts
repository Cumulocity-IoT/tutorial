import { NavigatorNode, hookNavigator } from '@c8y/ngx-components';

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

export const hooks = [hookNavigator(root)];
