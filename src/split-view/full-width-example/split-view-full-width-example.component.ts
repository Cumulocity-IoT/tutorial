// No platform screen uses a split view without details: this is an example scenario, an audit
// log whose entries are complete in the list and have nothing to open.
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuditRecordType, IAuditRecord } from '@c8y/client';
import {
  C8yTranslatePipe,
  DatePipe,
  IconDirective,
  ListGroupComponent,
  ListItemBodyComponent,
  ListItemComponent,
  ListItemIconComponent,
  ListItemTimelineComponent,
  SplitViewComponent,
  SplitViewListComponent,
  TitleComponent,
} from '@c8y/ngx-components';

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();

const record = (
  id: string,
  type: AuditRecordType,
  activity: string,
  text: string,
  user: string,
  minutes: number,
): IAuditRecord => ({
  id,
  type,
  activity,
  text,
  user,
  time: minutesAgo(minutes),
  source: { id: '3001' },
});

@Component({
  selector: 'c8y-split-view-full-width-example',
  templateUrl: './split-view-full-width-example.component.html',
  imports: [
    C8yTranslatePipe,
    DatePipe,
    IconDirective,
    TitleComponent,
    ListGroupComponent,
    ListItemTimelineComponent,
    ListItemComponent,
    ListItemIconComponent,
    ListItemBodyComponent,
    SplitViewComponent,
    SplitViewListComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitViewFullWidthExampleComponent {
  protected readonly records: IAuditRecord[] = [
    record(
      '5001',
      AuditRecordType.ALARM,
      'Alarm updated',
      'Alarm acknowledged: Battery level low: 15%',
      'operator',
      12,
    ),
    record(
      '5002',
      AuditRecordType.OPERATION,
      'Operation created',
      'Restart device',
      'operator',
      40,
    ),
    record(
      '5003',
      AuditRecordType.INVENTORY,
      'Managed object updated',
      'Name changed to "Delivery Truck #1"',
      'admin',
      95,
    ),
    record(
      '5004',
      AuditRecordType.USER,
      'User updated',
      'Role "Device manager" assigned',
      'admin',
      300,
    ),
  ];
}
