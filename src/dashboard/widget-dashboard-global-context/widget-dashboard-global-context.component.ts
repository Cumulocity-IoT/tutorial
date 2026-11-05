import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoreModule, Widget } from '@c8y/ngx-components';
import { GlobalContextDashboardDirective } from '@c8y/ngx-components/global-context';

const WIDGET_ID = 'tutorial.global-context-widget';

const CHILDREN: Record<string, Widget> = {
  'widget-global-context-1': {
    _x: 0,
    _y: 0,
    _width: 6,
    _height: 5,
    id: 'widget-global-context-1',
    componentId: WIDGET_ID,
    title: 'Linked widget',
    config: { displayMode: 'dashboard' },
  },
  'widget-global-context-2': {
    _x: 6,
    _y: 0,
    _width: 6,
    _height: 5,
    id: 'widget-global-context-2',
    componentId: WIDGET_ID,
    title: 'Second linked widget',
    config: { displayMode: 'dashboard' },
  },
};

@Component({
  selector: 'widget-dashboard-global-context',
  template: `<c8y-title>Widget dashboard with global context</c8y-title>
    <c8y-widgets-dashboard
      [c8yGlobalContextDashboard]="contextDashboard"
      [context]="{}"
      [contextDashboard]="contextDashboard"
      [widgets]="widgets"
      [settings]="{
        isLoading: false,
        isDisabled: false,
        canDelete: false,
        translateWidgetTitle: false,
        allowFullscreen: true,
        title: contextDashboard.name,
      }"
    >
    </c8y-widgets-dashboard>`,
  imports: [CoreModule, GlobalContextDashboardDirective],
  // Eager: hosts widgets through c8y-widgets-dashboard, which refresh through zone.js
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class WidgetDashboardGlobalContextComponent {
  readonly contextDashboard = { name: 'Widget dashboard with global context', children: CHILDREN };
  readonly widgets = Object.values(CHILDREN);
}
