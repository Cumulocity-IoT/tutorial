import { hookNavigator, NavigatorNode } from '@c8y/ngx-components';

export function provideListsSampleNavigator() {
  return [
    hookNavigator(
      new NavigatorNode({
        label: 'Lists',
        icon: 'c8y-device',
        priority: 97
      })
    )
  ];
}
