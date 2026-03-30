import { hookWidget, hookRoute, hookNavigator, NavigatorNode } from '@c8y/ngx-components';
import {
  GlobalContextSectionComponent,
  hookWidgetConfig
} from '@c8y/ngx-components/context-dashboard';
import { GLOBAL_CONTEXT_DASHBOARD_PATHS } from '@c8y/ngx-components/global-context';
import { gettext } from '@c8y/ngx-components/gettext';
import { WIDGET_CONTROLS } from './widget-config.model';

const WIDGET_ID = 'tutorial.global-context-widget';

/** Route path for the example dashboard */
const DASHBOARD_PATH = 'dashboard/global-context';

/**
 * Provides the Global Context Widget example.
 *
 * This widget demonstrates the new Global Time Context v2 integration:
 * - Uses GlobalContextConnectorComponent for dashboard mode
 * - Uses LocalControlsComponent for config/view_and_config modes
 * - Handles context changes and refresh events
 * - Manages loading state to pause/resume auto-refresh
 */
export function provideGlobalContextWidget() {
  return [
    // Register the dashboard path for Global Context support
    // This enables the global context toolbar on this named dashboard route
    {
      provide: GLOBAL_CONTEXT_DASHBOARD_PATHS,
      useValue: [DASHBOARD_PATH],
      multi: true
    },

    // Register the widget
    hookWidget({
      id: WIDGET_ID,
      label: gettext('Global context widget'),
      description: gettext(
        'Example widget demonstrating Global Time Context v2 integration with GlobalContextConnector and LocalControls.'
      ),
      loadComponent: () =>
        import('./global-context-widget-view.component').then(
          m => m.GlobalContextWidgetViewComponent
        ),
      loadConfigComponent: () =>
        import('./global-context-widget-config.component').then(
          m => m.GlobalContextWidgetConfigComponent
        ),
      data: {
        schema: () => import('c8y-schema-loader?interfaceName=WidgetConfig!./widget-config.model'),
        // Widget controls for view component
        controls: WIDGET_CONTROLS
      }
    }),

    // Register the "Time context" configuration section
    // This injects GlobalContextSectionComponent into the widget configuration panel
    hookWidgetConfig<GlobalContextSectionComponent>({
      widgetId: WIDGET_ID,
      priority: 10,
      label: gettext('Time context'),
      initialState: {
        controls: WIDGET_CONTROLS
      },
      loadComponent: () =>
        import('@c8y/ngx-components/context-dashboard').then(m => m.GlobalContextSectionComponent)
    }),

    // Register route for the example dashboard
    hookRoute({
      path: DASHBOARD_PATH,
      loadComponent: () =>
        import('./global-context-dashboard.component').then(m => m.GlobalContextDashboardComponent)
    }),

    // Register navigator entry under "Dashboards"
    hookNavigator(
      new NavigatorNode({
        label: gettext('Global context'),
        path: `/${DASHBOARD_PATH}`,
        icon: 'clock1',
        priority: -10,
        parent: 'Dashboards'
      })
    )
  ];
}
