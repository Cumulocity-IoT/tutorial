import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ContextData, ContextRouteService, CoreModule, Widget } from '@c8y/ngx-components';
import { CommonModule } from '@angular/common';
import { ContextDashboardModule } from '@c8y/ngx-components/context-dashboard';

@Component({
  selector: 'tut-service-dashboard',
  template: `<c8y-title>Service dashboard</c8y-title>
    <c8y-context-dashboard
      [name]="name"
      [defaultWidgets]="defaultWidgets"
      [context]="context"
      [canDelete]="false"
    ></c8y-context-dashboard>`,
  standalone: true,
  imports: [CommonModule, CoreModule, ContextDashboardModule],
  // Eager: widgets render through c8y-dynamic-component, which relies on zone.js.
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ServiceDashboardComponent {
  context: (Data & ContextData) | null = null;
  name = 'service-dashboard';
  defaultWidgets: Widget[] = [];

  constructor(
    private route: ActivatedRoute,
    private contextRouteService: ContextRouteService,
  ) {
    this.context = this.contextRouteService.getContextData(this.route);
    if (this.context && this.context.contextData) {
      const service = this.context.contextData;
      this.name = this.name + '-' + service.id;
      this.defaultWidgets = [
        {
          _x: 3,
          _y: 0,
          _width: 6,
          _height: 6,
          componentId: 'angular.widget.demo',
          config: {
            text: 'Service status, metrics and related alarms',
          },
          title: 'Service status',
          id: 'service_status_widget',
        },
      ];
    }
  }
}
