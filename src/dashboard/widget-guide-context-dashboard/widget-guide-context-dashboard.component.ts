import { Component } from '@angular/core';
import { CoreModule, Widget } from '@c8y/ngx-components';
import { CommonModule } from '@angular/common';
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
  imports: [ContextDashboardModule, CoreModule, CommonModule]
})
export class WidgetGuideContextDashboardComponent {
  /**
   * Default widgets shown when no dashboard exists in the backend.
   *
   * Note: In the codex environment, the mock interceptor at
   * `packages/tutorial/src/__mocks/utils/generators/managedObjects.ts`
   * returns a fake dashboard, so these defaults are not used.
   * If you change these values, also update `generateDashboard()` in the mock.
   */
  defaultWidgets: Widget[] = [
    {
      _x: 3,
      _y: 0,
      _width: 6,
      _height: 6,
      componentId: 'angular.widget.demo',
      config: {
        text: 'This text is configured via the widget settings. Click the edit button to change it!'
      },
      title: 'Demo Widget Example1',
      id: 'demo_widget_example'
    }
  ];
}
