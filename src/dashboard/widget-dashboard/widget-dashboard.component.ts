import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Widget, DashboardSettings, DashboardChange, CoreModule } from '@c8y/ngx-components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tut-widget-dashboard',
  template: `<c8y-title>Widget dashboard</c8y-title>
    <!-- With no undo stack, Save stays disabled unless isSaveDisabled is false. Cancel only
         emits onCancelDashboard, so the host leaves edit mode itself. -->
    <c8y-widgets-dashboard
      #dashboard
      [context]="context"
      [contextDashboard]="contextDashboard"
      [widgets]="widgets"
      [settings]="settings"
      [editModeButtons]="editModeButtons"
      [isSaveDisabled]="false"
      (onCancelDashboard)="dashboard.editMode$.next(false)"
      (onChangeDashboard)="change($event)"
      (onAddWidget)="addWidget()"
      (onEditWidget)="editWidget($event)"
      (onEditDashboard)="editDashboard()"
    >
    </c8y-widgets-dashboard> `,
  standalone: true,
  imports: [CommonModule, CoreModule],
  // Eager: widgets render through c8y-dynamic-component, which relies on zone.js.
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class WidgetDashboardComponent {
  /**
   * The managed object the dashboard is displayed on. A real application passes the
   * selected device or group; the demo widgets below do not need one.
   */
  context = {};

  /**
   * Passed on to the widgets. `updateTarget: false` leaves each widget's own device target
   * alone; with the component default of `true`, the target is overridden with this `context`.
   * Either way nothing is persisted — only `ContextDashboardComponent` saves to the inventory.
   */
  contextDashboard = { updateTarget: false };

  /**
   * Required in edit mode — the undo/redo buttons read their state from here.
   * This example has no undo stack, so both stay disabled.
   */
  editModeButtons = {
    undoButtonDisabled: true,
    changeToUndoName: '',
    redoButtonDisabled: true,
    changeToRedoName: '',
  };

  settings: Partial<DashboardSettings> = {
    isLoading: false,
    isDisabled: false,
    canDelete: false,
    translateWidgetTitle: false,
    allowFullscreen: true,
    title: '',
  };

  widgets = [
    { _x: 0, _y: 0, _width: 6, _height: 4, componentId: 'angular.widget.demo' },
    { _x: 6, _y: 0, _width: 6, _height: 6, componentId: 'angular.widget.demo' },
  ] as Widget[];

  change(event: DashboardChange) {
    console.log('Dashboard changed', event);
  }

  /**
   * A real application opens the widget catalog here; this example appends a
   * demo widget so the event is visible without a backend.
   */
  addWidget() {
    this.widgets = [
      ...this.widgets,
      {
        _x: 0,
        _y: 6,
        _width: 6,
        _height: 4,
        componentId: 'angular.widget.demo',
        title: `Widget ${this.widgets.length + 1}`,
        config: { text: 'Added at runtime' },
        id: `demo-widget-${this.widgets.length + 1}`,
      } as Widget,
    ];
  }

  editWidget(event: DashboardChange) {
    console.log('Edit widget requested', event);
  }

  editDashboard() {
    console.log('Edit dashboard requested');
  }
}
