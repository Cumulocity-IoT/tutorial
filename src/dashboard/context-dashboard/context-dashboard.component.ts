import { Component } from '@angular/core';
import { CoreModule, Widget } from '@c8y/ngx-components';
import { ContextDashboardModule } from '@c8y/ngx-components/context-dashboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tut-context-dashboard',
  template: `<c8y-title>Context dashboard</c8y-title>
    <c8y-context-dashboard
      name="example-widget"
      [defaultWidgets]="defaultWidgets"
      [canDelete]="false"
    ></c8y-context-dashboard> `,
  standalone: true,
  imports: [ContextDashboardModule, CoreModule, CommonModule]
})
export class ContextDashboardComponent {
  defaultWidgets: Widget[] = [
    {
      _x: 3,
      _y: 0,
      _width: 6,
      _height: 6,
      componentId: 'angular.widget.demo',
      config: {
        text: 'Welcome to a context dashboard'
      },
      title: 'Hello',
      id: 'some_unique_id'
    }
  ];
}
