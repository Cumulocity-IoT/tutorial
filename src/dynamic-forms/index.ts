import { hookNavigator, NavigatorNode } from '@c8y/ngx-components';

export * from './custom-element-example/custom-element-example.module';

export function provideDynamicFormsNavigator() {
  return [
    hookNavigator(
      new NavigatorNode({
        label: 'Dynamic forms',
        icon: 'file-text'
      })
    )
  ];
}
