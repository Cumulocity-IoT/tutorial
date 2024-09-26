import { NgModule } from '@angular/core';
import { NavigatorNode, hookAction, hookNavigator, hookRoute } from '@c8y/ngx-components';
import { ExampleActionFactory } from './action';

/**
 * Use our predefined InjectionTokens and provide your own classes to extend behavior
 * and functionality of existing ones. Implement your own NavigationNodes, Tabs, Actions and Breadcrumbs.
 * Note: Hooks should always be implemented in the module where they are used, so that
 * a module can act standalone and has no dependencies on other modules.
 */
export const hooks = [
  hookAction(ExampleActionFactory),
  hookRoute({
    path: 'hooks/action',
    loadComponent: () => import('./basic-view/basic-view.component').then(m => m.BasicViewComponent)
  }),
  hookNavigator(
    new NavigatorNode({
      priority: 100,
      path: 'hooks/action',
      icon: 'increase',
      label: 'Action',
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
export class ActionModule {}
