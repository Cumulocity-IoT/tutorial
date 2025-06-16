import { Component, Input, OnInit } from '@angular/core';
import { IEvent, IManagedObject } from '@c8y/client';
import { DynamicComponentAlertAggregator, DynamicComponent } from '@c8y/ngx-components';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { WidgetConfig } from './widget-config.model';

@Component({
  selector: 'app-widget-resolvers',
  templateUrl: './widget-resolvers.component.html',
  standalone: true,
  imports: [FormsModule, JsonPipe]
})
export class WidgetResolversComponent implements OnInit, DynamicComponent {
  @Input() config: WidgetConfig;
  label: string;
  value: string;
  alerts: DynamicComponentAlertAggregator;

  ngOnInit() {
    const event: IEvent = this.config.event;
    const source: IManagedObject = this.config.source;
    const property: IManagedObject = this.config.property;
    const propertyKey = Object.keys(property.c8y_JsonSchema.properties)[0];
    const propertyValue = property.c8y_JsonSchema.properties[propertyKey];
    const propertyTitle = propertyValue.title;
    this.label = propertyTitle;
    if (property.appliesTo?.EVENTS) {
      this.setValue(event[propertyKey]);
    } else {
      this.setValue(source[propertyKey]);
    }
  }

  private setValue(value: any) {
    if (typeof value === 'string') {
      this.value = value;
    } else {
      this.value = JSON.stringify(value);
    }
  }
}
