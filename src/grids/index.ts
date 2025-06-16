import { hookNavigator, NavigatorNode } from '@c8y/ngx-components';

export function provideGridSampleNode() {
  return [
    hookNavigator(
      new NavigatorNode({
        label: 'Data grid examples',
        icon: 'table',
        priority: 30
      })
    )
  ];
}
