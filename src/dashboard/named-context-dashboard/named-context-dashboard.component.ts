import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ContextData, ContextRouteService, CoreModule, Widget } from '@c8y/ngx-components';
import { CommonModule } from '@angular/common';
import { ContextDashboardModule } from '@c8y/ngx-components/context-dashboard';

@Component({
  selector: 'tut-named-context-dashboard',
  template: `<c8y-title>Named context dashboard</c8y-title>
    <c8y-context-dashboard
      [name]="name"
      [defaultWidgets]="defaultWidgets"
      [context]="context"
      [canDelete]="false"
    ></c8y-context-dashboard> `,
  standalone: true,
  imports: [CommonModule, CoreModule, ContextDashboardModule]
})
export class NamedContextDashboardComponent {
  context: (Data & ContextData) | null = null;
  name = 'myCustomDeviceDashboardName';
  defaultWidgets: Widget[] = [];

  constructor(
    private route: ActivatedRoute,
    private contextRouteService: ContextRouteService
  ) {
    this.context = this.contextRouteService.getContextData(this.route);
    if (this.context && this.context.contextData) {
      const device = this.context.contextData;
      this.name = this.name + '-' + device.id;
      this.defaultWidgets = [
        {
          _x: 3,
          _y: 0,
          _width: 6,
          _height: 6,
          componentId: 'angular.widget.demo',
          config: {
            device: {
              id: device.id,
              name: device.name
            },
            text: 'Welcome to a context dashboard'
          },
          title: 'Hello',
          id: 'some_unique_id'
        }
      ];
    }
  }
}
