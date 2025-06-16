import { hookNavigator, NavigatorNode } from '@c8y/ngx-components';

export function provideMapExampleNavigator() {
  return [
    hookNavigator(
      new NavigatorNode({
        priority: 20,
        icon: 'map',
        label: 'Map examples'
      })
    )
  ];
}
