import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { EventService, IEvent, IManagedObject, InventoryService } from '@c8y/client';
import {
  DynamicComponent,
  DynamicComponentAlert,
  DynamicComponentAlertAggregator
} from '@c8y/ngx-components';

@Component({
  selector: 'app-widget-resolvers-config',
  templateUrl: './widget-resolvers-config.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class WidgetResolversConfigComponent implements OnInit, DynamicComponent {
  events: IEvent[];
  properties: IManagedObject[];

  @Input() config: any;
  alerts: DynamicComponentAlertAggregator;

  constructor(
    private eventsService: EventService,
    private inventory: InventoryService
  ) {}

  ngOnInit() {
    if (!this.config.event) {
      this.config.event = {};
    }
    this.loadData();
  }

  async loadData() {
    const [events, properties] = await Promise.all([
      this.eventsService.list({ pageSize: 20 }),
      this.inventory.list({ type: 'c8y_JsonSchema', pageSize: 100 })
    ]);
    this.events = events.data;
    if (this.config?.event && !(this.config?.event instanceof DynamicComponentAlert)) {
      const configuredEventPresent = this.events.find(event => event.id === this.config?.event.id);
      if (!configuredEventPresent) {
        this.events.push(this.config?.event);
      }
    }
    this.properties = properties.data;
    if (this.config?.property && !(this.config?.property instanceof DynamicComponentAlert)) {
      const configuredPropertyPresent = this.properties.find(
        property => property.id === this.config?.property.id
      );
      if (!configuredPropertyPresent) {
        this.properties.push(this.config?.property);
      }
    }
  }

  onEventSelect(eventId: string) {
    const event = this.events.find(tmp => tmp.id === eventId);
    this.config.event = event;
    this.config.source = { id: event.source.id, name: event.source.name };
  }

  onPropertySelect(propertyId: string) {
    const property = this.properties.find(tmp => tmp.id === propertyId);
    this.config.property = property;
  }
}
