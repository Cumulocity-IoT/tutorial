import { JsonPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  C8yTranslatePipe,
  DatePipe,
  HumanizePipe,
  IconDirective,
  IconPanelComponent,
  ListGroupComponent,
  ListItemBodyComponent,
  ListItemComponent,
  ListItemIconComponent,
  ListItemTimelineComponent,
  SplitViewComponent,
  SplitViewDetailsComponent,
  SplitViewListComponent,
  SplitViewListItemDirective,
  TitleComponent,
} from '@c8y/ngx-components';

interface DeviceEvent {
  id: string;
  type: string;
  text: string;
  source: { name: string };
  time: Date;
  creationTime: Date;
  customData?: Record<string, unknown>;
}

const now = Date.now();

// Hardcoded for the example. Real implementation loads via EventService from @c8y/client.
const EVENTS: DeviceEvent[] = [
  {
    id: '1',
    type: 'c8y_LocationUpdate',
    text: 'Location updated',
    source: { name: 'GPS Tracker Fleet 07' },
    time: new Date(now - 2 * 60 * 1000),
    creationTime: new Date(now - 2 * 60 * 1000),
    customData: { c8y_Position: { lat: 40.74, lng: -74.03, alt: 25, accuracy: 5 } },
  },
  {
    id: '2',
    type: 'c8y_ConnectionEvent',
    text: 'Device connected',
    source: { name: 'Edge Gateway Berlin' },
    time: new Date(now - 8 * 60 * 1000),
    creationTime: new Date(now - 8 * 60 * 1000),
  },
  {
    id: '3',
    type: 'c8y_DisconnectionEvent',
    text: 'Device disconnected',
    source: { name: 'Temperature Sensor Lab' },
    time: new Date(now - 15 * 60 * 1000),
    creationTime: new Date(now - 15 * 60 * 1000),
  },
  {
    id: '4',
    type: 'c8y_LocationUpdate',
    text: 'Location updated',
    source: { name: 'GPS Tracker Fleet 07' },
    time: new Date(now - 22 * 60 * 1000),
    creationTime: new Date(now - 22 * 60 * 1000),
    customData: { c8y_Position: { lat: 40.71, lng: -74.01, alt: 20, accuracy: 5 } },
  },
  {
    id: '5',
    type: 'c8y_ConnectionEvent',
    text: 'Device connected',
    source: { name: 'Smart Meter Floor 2' },
    time: new Date(now - 45 * 60 * 1000),
    creationTime: new Date(now - 45 * 60 * 1000),
  },
  {
    id: '6',
    type: 'c8y_Bootstrap',
    text: 'Device bootstrapped',
    source: { name: 'Air Quality Monitor' },
    time: new Date(now - 60 * 60 * 1000),
    creationTime: new Date(now - 60 * 60 * 1000),
  },
];

@Component({
  selector: 'c8y-split-view-resizable-example',
  templateUrl: './split-view-resizable-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TitleComponent,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    C8yTranslatePipe,
    DatePipe,
    HumanizePipe,
    IconDirective,
    IconPanelComponent,
    JsonPipe,
    KeyValuePipe,
    ListGroupComponent,
    ListItemTimelineComponent,
    ListItemComponent,
    ListItemIconComponent,
    ListItemBodyComponent,
    SplitViewComponent,
    SplitViewListComponent,
    SplitViewDetailsComponent,
    SplitViewListItemDirective,
  ],
})
export class SplitViewResizableExampleComponent {
  protected readonly EVENT_ICON = 'online1';
  protected readonly events = signal<DeviceEvent[]>([...EVENTS]);
  protected readonly selectedEvent = signal<DeviceEvent | undefined>(undefined);

  isComplexValue(value: unknown): boolean {
    return typeof value === 'object' && value !== null;
  }

  // Real implementation uses router navigation — the detail is a separate routed component
  // loaded via <router-outlet> inside <c8y-sv-details>. Selection is driven by routerLinkActive.
  onSelectionChange(event: DeviceEvent | null): void {
    this.selectedEvent.set(event ?? undefined);
  }
}
