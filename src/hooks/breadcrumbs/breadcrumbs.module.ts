import { NgModule } from '@angular/core';
import { NavigatorNode, hookBreadcrumb, hookNavigator, hookRoute } from '@c8y/ngx-components';
import { ExampleBreadcrumbFactory } from './breadcrumbs';

/**
 * Use our predefined InjectionTokens and provide your own classes to extend behavior
 * and functionality of existing ones. Implement your own NavigationNodes, Tabs, Actions and Breadcrumbs.
 * Note: Hooks should always be implemented in the module where they are used, so that
 * a module can act standalone and has no dependencies on other modules.
 */
export const hooks = [
  hookBreadcrumb(ExampleBreadcrumbFactory),
  hookRoute({
    path: 'hooks/breadcrumbs',
    loadComponent: () => import('./basic-view/basic-view.component').then(m => m.BasicViewComponent)
  }),
  hookNavigator(
    new NavigatorNode({
      priority: 80,
      path: 'hooks/breadcrumbs',
      icon: 'forward',
      label: 'Breadcrumbs',
      parent: 'Hooks'
    })
  )
];

@NgModule({
  /**
   * Adding the hooks to the providers:
   */
  providers: [...hooks]
})
export class BreadcrumbsModule {}
