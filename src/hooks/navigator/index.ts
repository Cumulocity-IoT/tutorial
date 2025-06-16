import { hookNavigator } from '@c8y/ngx-components';
import { ExampleNavigationFactory } from './navigator';

export function provideHooksNavigatorSample() {
  /**
   * Use our predefined InjectionTokens and provide your own classes to extend behavior
   * and functionality of existing ones. Implement your own NavigationNodes, Tabs, Actions and Breadcrumbs.
   * Note: Hooks should always be implemented in the module where they are used, so that
   * a module can act standalone and has no dependencies on other modules.
   */
  return [hookNavigator(ExampleNavigationFactory)];
}
