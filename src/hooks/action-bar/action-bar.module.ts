import { NgModule } from '@angular/core';
import { NavigatorNode, hookActionBar, hookNavigator, hookRoute } from '@c8y/ngx-components';
import { ExampleActionBarFactory } from './action-bar';

/**
 * Use our predefined InjectionTokens and provide your own classes to extend behavior
 * and functionality of existing ones. Implement your own NavigationNodes, Tabs, Actions and Breadcrumbs.
 * Note: Hooks should always be implemented in the module where they are used, so that
 * a module can act standalone and has no dependencies on other modules.
 */
export const hooks = [
  hookActionBar(ExampleActionBarFactory),
  hookRoute({
    path: 'hooks/action-bar',
    loadComponent: () => import('./basic-view/basic-view.component').then(m => m.BasicViewComponent)
  }),
  hookNavigator(
    new NavigatorNode({
      priority: 100,
      path: 'hooks/action-bar',
      icon: 'arrows-left-right-diagonal',
      label: 'Action Bar',
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
export class ActionBarModule {}
