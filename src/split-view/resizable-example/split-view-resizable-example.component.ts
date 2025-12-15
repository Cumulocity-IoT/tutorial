import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  CoreModule,
  DeviceStatusComponent,
  EmptyStateComponent,
  IconDirective,
  ListItemBodyComponent,
  ListItemComponent,
  ListItemIconComponent,
  SplitViewComponent,
  SplitViewDetailsActionsComponent,
  SplitViewDetailsComponent,
  SplitViewExtraHeaderComponent,
  SplitViewFooterComponent,
  SplitViewHeaderActionsComponent,
  SplitViewListComponent,
  SplitViewListItemDirective
} from '@c8y/ngx-components';

type DeviceItem = {
  id: number;
  name: string;
  status: string;
  location: string;
  deviceId: string;
  lastSeen: string;
  type: string;
  time: string;
  firstOccurrenceTime: string;
  managedObject: {
    id: string;
    c8y_Availability: { status: string };
    c8y_Connection: { status: string };
    c8y_RequiredAvailability: { responseInterval: number };
  };
};

@Component({
  selector: 'c8y-split-view-resizable-example',
  templateUrl: './split-view-resizable-example.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    DeviceStatusComponent,
    ListItemComponent,
    ListItemIconComponent,
    ListItemBodyComponent,
    IconDirective,
    EmptyStateComponent,
    SplitViewComponent,
    SplitViewListComponent,
    SplitViewDetailsComponent,
    SplitViewHeaderActionsComponent,
    SplitViewFooterComponent,
    SplitViewExtraHeaderComponent,
    SplitViewDetailsActionsComponent,
    SplitViewListItemDirective
  ]
})
export class SplitViewResizableExampleComponent {
  @ViewChild(SplitViewDetailsComponent) detailsComponent?: SplitViewDetailsComponent;

  loading = false;
  selectedItem?: DeviceItem;

  items: DeviceItem[] = [
    {
      id: 1,
      name: 'Smart Thermostat Alpha',
      status: 'Active',
      location: 'Building A - Floor 1',
      deviceId: 'THM-001',
      lastSeen: '2 minutes ago',
      type: 'Temperature Sensor',
      time: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      firstOccurrenceTime: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      managedObject: {
        id: 'THM-001',
        c8y_Availability: { status: 'AVAILABLE' },
        c8y_Connection: { status: 'CONNECTED' },
        c8y_RequiredAvailability: { responseInterval: 60 }
      }
    },
    {
      id: 2,
      name: 'Security Camera Beta',
      status: 'Inactive',
      location: 'Building B - Lobby',
      deviceId: 'CAM-002',
      lastSeen: '1 hour ago',
      type: 'Security Camera',
      time: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      firstOccurrenceTime: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      managedObject: {
        id: 'CAM-002',
        c8y_Availability: { status: 'UNAVAILABLE' },
        c8y_Connection: { status: 'DISCONNECTED' },
        c8y_RequiredAvailability: { responseInterval: 60 }
      }
    },
    {
      id: 3,
      name: 'Air Quality Monitor Gamma',
      status: 'Active',
      location: 'Building C - Office',
      deviceId: 'AQM-003',
      lastSeen: '30 seconds ago',
      type: 'Environmental Sensor',
      time: new Date(Date.now() - 30 * 1000).toISOString(),
      firstOccurrenceTime: new Date(Date.now() - 30 * 1000).toISOString(),
      managedObject: {
        id: 'AQM-003',
        c8y_Availability: { status: 'AVAILABLE' },
        c8y_Connection: { status: 'CONNECTED' },
        c8y_RequiredAvailability: { responseInterval: 30 }
      }
    },
    {
      id: 4,
      name: 'Smart Lock Delta',
      status: 'Maintenance',
      location: 'Building A - Entrance',
      deviceId: 'LOCK-004',
      lastSeen: '5 minutes ago',
      type: 'Access Control',
      time: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      firstOccurrenceTime: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      managedObject: {
        id: 'LOCK-004',
        c8y_Availability: { status: 'MAINTENANCE' },
        c8y_Connection: { status: 'MAINTENANCE' },
        c8y_RequiredAvailability: { responseInterval: 120 }
      }
    },
    {
      id: 5,
      name: 'Energy Meter Epsilon',
      status: 'Active',
      location: 'Building D - Utility Room',
      deviceId: 'EMT-005',
      lastSeen: '1 minute ago',
      type: 'Energy Monitor',
      time: new Date(Date.now() - 60 * 1000).toISOString(),
      firstOccurrenceTime: new Date(Date.now() - 60 * 1000).toISOString(),
      managedObject: {
        id: 'EMT-005',
        c8y_Availability: { status: 'AVAILABLE' },
        c8y_Connection: { status: 'CONNECTED' },
        c8y_RequiredAvailability: { responseInterval: 300 }
      }
    }
  ];

  onSelectionChange(item: DeviceItem | null): void {
    this.selectedItem = item || undefined;
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }

  refresh(): void {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  editDevice(): void {
    if (!this.selectedItem) return;
    // eslint-disable-next-line no-console
    console.log('Edit device clicked:', this.selectedItem.name);
    // eslint-disable-next-line no-console
    console.log('Device details:', this.selectedItem);
  }

  restartDevice(): void {
    if (!this.selectedItem) return;
    // eslint-disable-next-line no-console
    console.log('Restart device clicked:', this.selectedItem.name);
    // eslint-disable-next-line no-console
    console.log('Restarting device:', this.selectedItem.deviceId);
  }

  deleteDevice(): void {
    if (!this.selectedItem) return;
    // eslint-disable-next-line no-console
    console.log('Delete device clicked:', this.selectedItem.name);
    // eslint-disable-next-line no-console
    console.log('Device ID:', this.selectedItem.deviceId);
  }

  clearSelection(): void {
    this.detailsComponent?.clearSelection();
  }

  getStatusColorClass(status: string): string {
    switch (status) {
      case 'AVAILABLE':
      case 'CONNECTED':
        return 'text-success';
      case 'UNAVAILABLE':
      case 'DISCONNECTED':
        return 'text-danger';
      case 'MAINTENANCE':
        return 'text-muted';
      default:
        return 'text-muted';
    }
  }
}
