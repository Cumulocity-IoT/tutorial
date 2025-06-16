import { hookNavigator, NavigatorNode } from '@c8y/ngx-components';

export function provideTranslationsNavigator() {
  return [
    hookNavigator(
      new NavigatorNode({
        priority: 20,
        icon: 'rocket',
        label: 'Translations'
      })
    )
  ];
}
