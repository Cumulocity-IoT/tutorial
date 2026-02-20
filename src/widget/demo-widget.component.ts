import { Component, computed, input, OnInit } from '@angular/core';
import {
  DismissAlertStrategy,
  DynamicComponentAlert,
  DynamicComponentAlertAggregator
} from '@c8y/ngx-components';
import { WidgetConfig } from './widget-config.model';

@Component({
  selector: 'c8y-widget-demo',
  template: `
    <div class="p-16">
      <h1>Demo Widget</h1>
      <p class="text">{{ displayText() }}</p>
      @if (deviceName()) {
        <small>Device: {{ deviceName() }}</small>
      }
      <div class="m-t-16">
        <button class="btn btn-default btn-sm" (click)="showAlert()">Show alert</button>
      </div>
    </div>
  `,
  styles: [
    `
      .text {
        font-size: 1.5em;
        color: var(--c8y-brand-primary);
      }
    `
  ],
  standalone: true
})
export class WidgetDemo implements OnInit {
  readonly config = input<WidgetConfig>();

  /** Computed signal for display text with fallback */
  readonly displayText = computed(() => this.config()?.text || 'No text configured');

  /** Computed signal for device name */
  readonly deviceName = computed(() => this.config()?.device?.name);

  /** Set by the dashboard framework - used to display alerts on the widget */
  alerts: DynamicComponentAlertAggregator;

  ngOnInit(): void {
    // Enable dismissible alerts for warning type
    this.alerts?.setAlertGroupDismissStrategy('warning', DismissAlertStrategy.TEMPORARY);
  }

  showAlert(): void {
    this.alerts?.addAlerts(
      new DynamicComponentAlert({ type: 'warning', text: 'This is a dismissible demo alert!' })
    );
  }
}
