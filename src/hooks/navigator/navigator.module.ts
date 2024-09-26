import { NgModule } from '@angular/core';
import { hookNavigator } from '@c8y/ngx-components';
import { ExampleNavigationFactory } from './navigator';

/**
 * Use our predefined InjectionTokens and provide your own classes to extend behavior
 * and functionality of existing ones. Implement your own NavigationNodes, Tabs, Actions and Breadcrumbs.
 * Note: Hooks should always be implemented in the module where they are used, so that
 * a module can act standalone and has no dependencies on other modules.
 */
export const hooks = [hookNavigator(ExampleNavigationFactory)];

@NgModule({
  declarations: [],
  imports: [],
  /**
   * Adding the hooks to the providers:
   */
  providers: [...hooks]
})
export class NavigatorModule {}
