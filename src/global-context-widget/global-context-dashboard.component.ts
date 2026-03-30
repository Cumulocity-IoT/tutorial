import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule, Widget } from '@c8y/ngx-components';
import { ContextDashboardModule } from '@c8y/ngx-components/context-dashboard';

/**
 * Dashboard page showcasing the Global Time Context v2 widget example.
 *
 * This dashboard demonstrates:
 * - GlobalContextConnectorComponent for dashboard mode (linked to global context)
 * - LocalControlsComponent for config/view_and_config modes (local controls)
 * - Time context integration with global dashboard controls in the action bar
 *
 * The widget responds to:
 * - Time range changes (Live mode: last hour, etc. / History mode: date range)
 * - Auto-refresh toggle
 * - Manual refresh
 * - Aggregation settings (in History mode)
 */
@Component({
  selector: 'c8y-global-context-dashboard',
  standalone: true,
  imports: [CommonModule, CoreModule, ContextDashboardModule],
  template: `
    <c8y-title>Global Time Context Example</c8y-title>
    <c8y-context-dashboard
      name="global-context-example"
      [defaultWidgets]="defaultWidgets"
      [canDelete]="false"
    ></c8y-context-dashboard>
  `
})
export class GlobalContextDashboardComponent {
  defaultWidgets: Widget[] = [
    {
      _x: 0,
      _y: 0,
      _width: 6,
      _height: 5,
      componentId: 'tutorial.global-context-widget',
      config: {
        // IMPORTANT: displayMode must be 'dashboard' for GlobalContextConnector to be used.
        // This tells the system that this widget is linked to the global time context.
        displayMode: 'dashboard'
      },
      title: 'Widget 1 - Linked to Global Context',
      id: 'global-context-widget-1'
    },
    {
      _x: 6,
      _y: 0,
      _width: 6,
      _height: 5,
      componentId: 'tutorial.global-context-widget',
      config: {
        displayMode: 'dashboard'
      },
      title: 'Widget 2 - Also Linked',
      id: 'global-context-widget-2'
    }
  ];
}
