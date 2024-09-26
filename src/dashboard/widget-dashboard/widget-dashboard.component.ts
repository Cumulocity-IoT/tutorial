import { Component } from '@angular/core';
import { Widget, DashboardSettings, DashboardChange, CoreModule } from '@c8y/ngx-components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'widget-dashboard',
  template: `<c8y-title>Widget dashboard</c8y-title>
    <c8y-widgets-dashboard
      [context]="{}"
      [contextDashboard]="{}"
      [widgets]="widgets"
      [settings]="{
        isLoading: false,
        isDisabled: false,
        canDelete: false,
        translateWidgetTitle: false,
        allowFullscreen: true,
        title: ''
      }"
      (onChangeDashboard)="change($event)"
      (onAddWidget)="addWidget()"
      (onEditWidget)="editWidget($event)"
      (onEditDashboard)="editDashboard()"
    >
    </c8y-widgets-dashboard> `,
  standalone: true,
  imports: [CommonModule, CoreModule]
})
export class WidgetDashboardComponent {
  widgets = [
    { _x: 0, _y: 0, _width: 6, _height: 4, componentId: 'angular.widget.demo' },
    { _x: 6, _y: 0, _width: 6, _height: 6, componentId: 'angular.widget.demo' }
  ] as Widget[];

  toggleFreeze(event: DashboardSettings) {
    console.log('toggle freeze called', event);
    event.isFrozen = !event.isFrozen;
  }

  change(event: DashboardChange) {
    console.log('change called', event);
  }

  addWidget() {
    console.log('add called');
  }

  editWidget(event: DashboardChange) {
    console.log('edit called', event);
  }

  editDashboard() {
    console.log('edit dashboard called');
  }

  update(event: DashboardChange) {
    console.log(event);
  }
}
