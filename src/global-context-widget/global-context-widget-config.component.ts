import { Component, Input, OnInit } from '@angular/core';
import { WidgetConfig } from './widget-config.model';

/**
 * Widget configuration component.
 *
 * Note: The "Time context" section (display mode, time range, aggregation, etc.)
 * is automatically added by hookWidgetConfig with GlobalContextSectionComponent.
 * This component only handles widget-specific configuration.
 */
@Component({
  selector: 'c8y-global-context-widget-config',
  standalone: true,
  template: `
    <div class="alert alert-info m-t-16">
      <p class="m-b-0">
        <strong>Note:</strong> The "Time context" section above is automatically injected via
        <code>hookWidgetConfig</code> with <code>GlobalContextSectionComponent</code>. It handles:
      </p>
      <ul class="m-b-0 m-t-8">
        <li>Display mode selection (Dashboard / Configuration / Widget view)</li>
        <li>Time range configuration (Live / History)</li>
        <li>Auto-refresh settings</li>
        <li>Aggregation options</li>
      </ul>
    </div>
  `
})
export class GlobalContextWidgetConfigComponent implements OnInit {
  @Input() config: WidgetConfig = {};

  ngOnInit() {
    console.log('Widget config loaded:', this.config);
  }
}
