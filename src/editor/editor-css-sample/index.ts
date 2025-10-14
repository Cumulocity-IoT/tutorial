import { hookNavigator, hookRoute } from '@c8y/ngx-components';

export const editorCSSSampleProviders = [
  hookRoute({
    path: 'editor-css-sample',
    loadComponent: () =>
      import('./editor-css-sample.component').then(c => c.EditorCSSSampleComponent)
  }),
  hookNavigator({
    label: 'Editor CSS sample',
    icon: 'code',
    path: 'editor-css-sample'
  })
];
