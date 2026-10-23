import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  ActionBarItemComponent,
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  C8yTranslatePipe,
  EmptyStateComponent,
  HelpComponent,
  IconDirective,
  DatePipe,
  ListGroupComponent,
  ListItemBodyComponent,
  ListItemCollapseComponent,
  ListItemComponent,
  ListItemIconComponent,
  ListItemTimelineComponent,
  LoadingComponent,
  TitleComponent,
} from '@c8y/ngx-components';
import { FormsModule } from '@angular/forms';

type OperationStatus = 'PENDING' | 'EXECUTING' | 'SUCCESSFUL' | 'FAILED';

interface Operation {
  id: string;
  description: string;
  device: string;
  status: OperationStatus;
  creationTime: Date;
}

// Matches operationStatusIcons from @c8y/ngx-components/core/common/status.model.ts
const STATUS_ICON: Record<OperationStatus, string> = {
  PENDING: 'clock-o',
  EXECUTING: 'refresh',
  SUCCESSFUL: 'check-circle',
  FAILED: 'exclamation-circle',
};

// Matches operationStatusClasses from @c8y/ngx-components/core/common/status.model.ts
const STATUS_CLASS: Record<OperationStatus, string> = {
  PENDING: 'text-info',
  EXECUTING: 'text-info',
  SUCCESSFUL: 'text-success',
  FAILED: 'text-danger',
};

// Hardcoded for the example. Real implementation loads via OperationService from @c8y/client.
const ALL_OPERATIONS: Operation[] = [
  {
    id: '1',
    description: 'Restart device',
    device: 'Edge Gateway Berlin',
    status: 'SUCCESSFUL',
    creationTime: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: '2',
    description: 'Update firmware to v2.1.0',
    device: 'Smart Meter Floor 2',
    status: 'EXECUTING',
    creationTime: new Date(Date.now() - 12 * 60 * 1000),
  },
  {
    id: '3',
    description: 'Send configuration',
    device: 'Air Quality Monitor',
    status: 'PENDING',
    creationTime: new Date(Date.now() - 20 * 60 * 1000),
  },
  {
    id: '4',
    description: 'Update firmware to v1.4.2',
    device: 'Temperature Sensor Lab',
    status: 'FAILED',
    creationTime: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: '5',
    description: 'Apply network settings',
    device: 'Parking Sensor Block A',
    status: 'SUCCESSFUL',
    creationTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '6',
    description: 'Install c8y-snmp-agent v1.0.4',
    device: 'Network Switch Rack 3',
    status: 'SUCCESSFUL',
    creationTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: '7',
    description: 'Remote shell session',
    device: 'Modbus PLC Line 1',
    status: 'FAILED',
    creationTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: '8',
    description: 'Retrieve logs',
    device: 'HVAC Controller Building C',
    status: 'SUCCESSFUL',
    creationTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '9',
    description: 'Set maintenance mode',
    device: 'OPC UA Server Hall B',
    status: 'PENDING',
    creationTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: '10',
    description: 'Update configuration profile',
    device: 'GPS Tracker Fleet 07',
    status: 'EXECUTING',
    creationTime: new Date(Date.now() - 7 * 60 * 60 * 1000),
  },
  {
    id: '11',
    description: 'Factory reset',
    device: 'Smart Lock Entrance 2',
    status: 'FAILED',
    creationTime: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: '12',
    description: 'Push measurement mapping',
    device: 'Vibration Sensor Press 3',
    status: 'SUCCESSFUL',
    creationTime: new Date(Date.now() - 10 * 60 * 60 * 1000),
  },
];

@Component({
  selector: 'c8y-operations-list-example',
  templateUrl: './operations-list-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TitleComponent,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    HelpComponent,
    ActionBarItemComponent,
    EmptyStateComponent,
    LoadingComponent,
    IconDirective,
    ListGroupComponent,
    ListItemTimelineComponent,
    ListItemComponent,
    ListItemIconComponent,
    ListItemBodyComponent,
    ListItemCollapseComponent,
    C8yTranslatePipe,
    DatePipe,
    FormsModule,
  ],
})
export class OperationsListExampleComponent {
  protected readonly loading = signal(false);
  protected readonly statusFilter = signal<OperationStatus | ''>('');
  protected readonly statusIcon = STATUS_ICON;
  protected readonly statusClass = STATUS_CLASS;

  protected readonly operations = computed(() => {
    const filter = this.statusFilter();
    return filter ? ALL_OPERATIONS.filter((op) => op.status === filter) : ALL_OPERATIONS;
  });

  reload(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 1200);
  }
}
