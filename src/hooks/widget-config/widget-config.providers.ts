import {
  EmptyComponent,
  NavigatorNode,
  hookComponent,
  hookNavigator,
  hookRoute
} from '@c8y/ngx-components';
import { hookWidgetConfig } from '@c8y/ngx-components/context-dashboard';

export const referenceWidgetDefinition = {
  id: 'reference.component',
  label:
    'A configuration is always attached to a component. This is an empty one, just for demo pruposes.',
  description: 'Nothing to describe',
  loadComponent: () => Promise.resolve(EmptyComponent)
};

/**
 * Use our predefined InjectionTokens and provide your own classes to extend behavior
 * and functionality of existing ones. Implement your own NavigationNodes, Tabs, Actions and Breadcrumbs.
 * Note: Hooks should always be implemented in the module where they are used, so that
 * a module can act standalone and has no dependencies on other modules.
 */
export const widgetConfigHookProviders = [
  hookRoute({
    path: 'hooks/widget-config',
    loadComponent: () => import('./basic-view/basic-edit.component').then(m => m.BasicEditComponent)
  }),
  hookNavigator(
    new NavigatorNode({
      priority: 70,
      path: 'hooks/widget-config',
      icon: 'edit',
      label: 'Widget Config',
      parent: 'Hooks'
    })
  ),
  hookComponent(referenceWidgetDefinition),
  // important
  hookWidgetConfig({
    widgetId: 'reference.component',
    label: 'An additional Configuration for the simple component',
    priority: 100,
    expanded: true,
    loadComponent: () =>
      import('./additional-config/additional-config.component').then(
        m => m.AdditionalConfigComponent
      )
  }),

  hookWidgetConfig({
    widgetId: 'reference.component',
    label: 'The default asset selector.',
    priority: 10,
    loadComponent: () =>
      import('@c8y/ngx-components/context-dashboard').then(m => m.WidgetAssetSelectorComponent)
  })
  // /important
];
