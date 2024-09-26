import { NgModule } from '@angular/core';
import { NavigatorNode, hookComponent, hookNavigator, hookRoute } from '@c8y/ngx-components';

/**
 * Use our predefined InjectionTokens and provide your own classes to extend behavior
 * and functionality of existing ones. Implement your own NavigationNodes, Tabs, Actions and Breadcrumbs.
 * Note: Hooks should always be implemented in the module where they are used, so that
 * a module can act standalone and has no dependencies on other modules.
 */
export const hooks = [
  hookRoute({
    path: 'hooks/component',
    loadComponent: () => import('./basic-view/basic-view.component').then(m => m.BasicViewComponent)
  }),
  hookNavigator(
    new NavigatorNode({
      priority: 70,
      path: 'hooks/component',
      icon: 'blockly',
      label: 'Component',
      parent: 'Hooks'
    })
  ),
  hookComponent({
    id: 'simple.component',
    label: 'My simple component',
    description: 'Nothing to describe',
    loadComponent: () => import('./basic-view/simple.component').then(m => m.SimpleComponent)
  })
];

@NgModule({
  /**
   * Adding the hooks to the providers:
   */
  providers: [...hooks]
})
export class ComponentModule {}
