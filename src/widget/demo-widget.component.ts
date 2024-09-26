import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  DismissAlertStrategy,
  DynamicComponentAlert,
  DynamicComponentAlertAggregator,
  gettext
} from '@c8y/ngx-components';

@Component({
  selector: 'c8y-widget-demo',
  template: `
    <div class="p-16">
      <h1>Hi I'm a widget from angular</h1>
      <p class="text">Text from config object: {{ config?.text || 'No text' }}</p>
      <small>My context is: {{ config?.device?.name || 'No context' }}</small
      ><br />
      <ng-container *ngIf="config?.date?.length === 2">
        My time context is:
        <ul>
          <li>from: {{ (config?.date[0] | c8yDate) || 'No time context' }}</li>
          <li>To: {{ (config?.date[1] | c8yDate) || 'No time context' }}</li>
        </ul>
      </ng-container>
      <button class="btn btn-default" (click)="addAlert()">Add warning alert</button>
    </div>
  `,
  styles: [
    `
      .text {
        font-size: 2em;
      }
    `
  ]
})
export class WidgetDemo implements OnChanges {
  @Input() config;
  alerts: DynamicComponentAlertAggregator;

  ngOnInit() {
    this.alerts.setAlertGroupDismissStrategy(
      'warning',
      DismissAlertStrategy.TEMPORARY_OR_PERMANENT
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['config']?.firstChange && changes['config']?.currentValue.date) {
      console.log('Global time context changed:', this.config.date);
    }
  }

  addAlert() {
    this.alerts.addAlerts(
      new DynamicComponentAlert({
        type: 'warning',
        text: gettext('Operation not supported by this device.')
      })
    );
  }
}
