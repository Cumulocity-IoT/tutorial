import { hookNavigator, NavigatorNode } from '@c8y/ngx-components';

export function provideHooksSample() {
  return [
    hookNavigator(
      new NavigatorNode({
        priority: 90,
        icon: 'u-turn',
        label: 'Hooks'
      })
    )
  ];
}
