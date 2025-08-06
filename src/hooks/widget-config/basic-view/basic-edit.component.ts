import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import {
  WidgetConfigSectionComponent,
  WidgetConfigService
} from '@c8y/ngx-components/context-dashboard';
import { referenceWidgetDefinition } from '../widget-config.providers';

/**
 * This is a standard angular component.
 * It simply shows the edit view of the widget.
 */
@Component({
  selector: 'tut-basic-widget-config-hook-view',
  template: `<div class="card">
    <div class="card-block">
      <c8y-widget-config-section
        *ngFor="let section of widgetConfigService.currentSections$ | async; let i = index"
        [section]="section"
      ></c8y-widget-config-section>
    </div>

    <div class="card-block">
      <label>The configuration is:</label>
      <code>
        <pre>
    {{ widgetConfigService.currentConfig$ | async | json }}
  </pre
        >
      </code>
    </div>
  </div>`,
  standalone: true,
  imports: [CoreModule, CommonModule, WidgetConfigSectionComponent, AsyncPipe, JsonPipe]
})
export class BasicEditComponent implements OnInit, OnDestroy {
  widgetConfigService = inject(WidgetConfigService);

  ngOnInit(): void {
    this.widgetConfigService.initConfig({});
    this.widgetConfigService.selectWidget(referenceWidgetDefinition);
  }

  ngOnDestroy(): void {
    this.widgetConfigService.deselectWidget();
  }
}
