// Based on packages/ngx-components/widgets/implementations/alarms/alarm-list-widget-view/
// alarm-list-widget.component.html: the alarms list inside a dashboard widget, without c8y-sv.
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  C8yTranslatePipe,
  DashboardChildComponent,
  DashboardChildTitleComponent,
  DashboardComponent,
  DatePipe,
  IconDirective,
  ListGroupComponent,
  ListItemBodyComponent,
  ListItemComponent,
  ListItemIconComponent,
  ListItemTimelineComponent,
  SplitViewListComponent,
  TitleComponent,
} from '@c8y/ngx-components';
import { AlarmsIconComponent } from '@c8y/ngx-components/alarms';
import { SplitViewAlarmsExampleStore } from '../alarms-example.store';

@Component({
  selector: 'c8y-split-view-standalone-list-example',
  templateUrl: './split-view-standalone-list-example.component.html',
  imports: [
    RouterLink,
    C8yTranslatePipe,
    DashboardComponent,
    DashboardChildComponent,
    DashboardChildTitleComponent,
    DatePipe,
    IconDirective,
    TitleComponent,
    ListGroupComponent,
    ListItemTimelineComponent,
    ListItemComponent,
    ListItemIconComponent,
    ListItemBodyComponent,
    AlarmsIconComponent,
    SplitViewListComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitViewStandaloneListExampleComponent {
  protected readonly alarms = inject(SplitViewAlarmsExampleStore).alarms;
}
