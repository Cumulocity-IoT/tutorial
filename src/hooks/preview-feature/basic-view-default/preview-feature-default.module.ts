import { NgModule } from '@angular/core';
import { hookNavigator, hookPreview, hookRoute } from '@c8y/ngx-components';
import { ExamplePreviewFeatureNavigationFactory } from './preview-feature.factory';

/**
 * Use our predefined InjectionTokens and provide your own classes to extend behavior
 * and functionality of existing ones. Implement your own NavigationNodes, Tabs, Actions and Breadcrumbs.
 * Note: Hooks should always be implemented in the module where they are used, so that
 * a module can act standalone and has no dependencies on other modules.
 */
export const hooks = [
  hookRoute({
    path: 'hooks/preview-feature-default',
    loadComponent: () => import('./basic-view-default.component').then(m => m.BasicViewComponent)
  }),
  hookNavigator(ExamplePreviewFeatureNavigationFactory),
  hookPreview({
    key: 'preview-feature-key',
    label: 'Example preview feature relying on feature toggles API',
    description: () =>
      import('@c8y/style/markdown-files/codex-example-markdown.md').then(m => m.default),
    settings: {
      reload: true
    }
  })
];

@NgModule({
  /**
   * Adding the hooks to the providers:
   */
  providers: [...hooks]
})
export class PreviewFeatureDefaultModule {}
