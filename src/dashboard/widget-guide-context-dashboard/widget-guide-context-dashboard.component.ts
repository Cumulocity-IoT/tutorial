import { Component } from '@angular/core';
import { CoreModule, Widget } from '@c8y/ngx-components';
import { CommonModule } from '@angular/common';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { DatapointSelectorModule } from '@c8y/ngx-components/datapoint-selector';
import { ContextDashboardModule } from '@c8y/ngx-components/context-dashboard';

@Component({
  selector: 'tut-widget-guide-dashboard',
  template: `
    <c8y-title>Context dashboard</c8y-title>
    <c8y-context-dashboard
      name="example-widget"
      [defaultWidgets]="defaultWidgets"
      [canDelete]="false"
    ></c8y-context-dashboard>
  `,
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    AssetSelectorModule,
    DatapointSelectorModule,
    ContextDashboardModule
  ]
})
export class WidgetGuideContextDashboardComponent {
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
