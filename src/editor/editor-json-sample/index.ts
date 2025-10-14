import { hookNavigator, hookRoute } from '@c8y/ngx-components';

export const editorJSONSampleProviders = [
  hookRoute({
    path: 'editor-json-sample',
    loadComponent: () =>
      import('./editor-json-sample.component').then(c => c.EditorJsonSampleComponent)
  }),
  hookNavigator({
    label: 'Editor JSON sample',
    icon: 'code',
    path: 'editor-json-sample'
  })
];
