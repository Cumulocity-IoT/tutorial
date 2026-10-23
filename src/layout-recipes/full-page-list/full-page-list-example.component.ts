import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ActionBarItemComponent,
  ActionControl,
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  BuiltInActionType,
  BulkActionControl,
  Column,
  DataGridModule,
  EmptyStateComponent,
  EmptyStateContextDirective,
  HelpComponent,
  IconDirective,
  Pagination,
  TitleComponent,
  C8yTranslatePipe,
} from '@c8y/ngx-components';

interface Device {
  id: string;
  name: string;
  type: string;
  'c8y_Availability.status': string;
  owner: string;
}

@Component({
  selector: 'c8y-full-page-list-example',
  templateUrl: './full-page-list-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TitleComponent,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    HelpComponent,
    IconDirective,
    ActionBarItemComponent,
    DataGridModule,
    EmptyStateComponent,
    EmptyStateContextDirective,
    C8yTranslatePipe,
  ],
})
export class FullPageListExampleComponent {
  protected readonly columns: Column[] = [
    { name: 'name', header: 'Name', path: 'name', sortable: true, filterable: true },
    { name: 'type', header: 'Type', path: 'type', filterable: true },
    { name: 'status', header: 'Availability', path: 'c8y_Availability.status' },
    { name: 'owner', header: 'Owner', path: 'owner' },
  ];

  protected readonly pagination: Pagination = { pageSize: 25, currentPage: 1 };

  // Real callbacks navigate to the edit route or call InventoryService.delete().
  protected readonly actionControls: ActionControl[] = [
    { type: BuiltInActionType.Edit, callback: (item) => console.log('Edit', item) },
    { type: BuiltInActionType.Delete, callback: (item) => console.log('Delete', item) },
  ];

  protected readonly bulkActionControls: BulkActionControl[] = [
    { type: BuiltInActionType.Delete, callback: (ids) => console.log('Delete', ids) },
  ];

  // Hardcoded for the example. Real implementation loads via InventoryService from @c8y/client.
  protected readonly rows = signal<Device[]>([
    {
      id: '1',
      name: 'Edge Gateway Berlin',
      type: 'c8y_Gateway',
      'c8y_Availability.status': 'AVAILABLE',
      owner: 'admin',
    },
    {
      id: '2',
      name: 'Temperature Sensor Lab',
      type: 'c8y_MQTTDevice',
      'c8y_Availability.status': 'UNAVAILABLE',
      owner: 'admin',
    },
    {
      id: '3',
      name: 'Smart Meter Floor 2',
      type: 'c8y_Meter',
      'c8y_Availability.status': 'AVAILABLE',
      owner: 'service',
    },
    {
      id: '4',
      name: 'Air Quality Monitor',
      type: 'c8y_AQSensor',
      'c8y_Availability.status': 'MAINTENANCE',
      owner: 'admin',
    },
    {
      id: '5',
      name: 'Parking Sensor Block A',
      type: 'c8y_LoRaDevice',
      'c8y_Availability.status': 'AVAILABLE',
      owner: 'iot-user',
    },
    {
      id: '6',
      name: 'Vibration Sensor Press 3',
      type: 'c8y_Vibration',
      'c8y_Availability.status': 'AVAILABLE',
      owner: 'service',
    },
    {
      id: '7',
      name: 'Modbus PLC Line 1',
      type: 'c8y_ModbusDevice',
      'c8y_Availability.status': 'AVAILABLE',
      owner: 'service',
    },
    {
      id: '8',
      name: 'OPC UA Server Hall B',
      type: 'c8y_OPCUADevice',
      'c8y_Availability.status': 'MAINTENANCE',
      owner: 'admin',
    },
    {
      id: '9',
      name: 'GPS Tracker Fleet 07',
      type: 'c8y_GPSDevice',
      'c8y_Availability.status': 'AVAILABLE',
      owner: 'iot-user',
    },
    {
      id: '10',
      name: 'Water Level Sensor Tank 4',
      type: 'c8y_Sensor',
      'c8y_Availability.status': 'UNAVAILABLE',
      owner: 'service',
    },
    {
      id: '11',
      name: 'HVAC Controller Building C',
      type: 'c8y_Actuator',
      'c8y_Availability.status': 'AVAILABLE',
      owner: 'admin',
    },
    {
      id: '12',
      name: 'Smart Lock Entrance 2',
      type: 'c8y_Actuator',
      'c8y_Availability.status': 'AVAILABLE',
      owner: 'iot-user',
    },
    {
      id: '13',
      name: 'CO2 Sensor Office 4B',
      type: 'c8y_AQSensor',
      'c8y_Availability.status': 'AVAILABLE',
      owner: 'service',
    },
    {
      id: '14',
      name: 'Power Meter Substation 1',
      type: 'c8y_Meter',
      'c8y_Availability.status': 'AVAILABLE',
      owner: 'admin',
    },
    {
      id: '15',
      name: 'LoRa End Node Warehouse',
      type: 'c8y_LoRaDevice',
      'c8y_Availability.status': 'MAINTENANCE',
      owner: 'iot-user',
    },
  ]);

  protected readonly noDataMessage = 'No devices registered.';
  protected readonly noDataSubtitle = 'Register your first device to start collecting data.';
  protected readonly noResultsMessage = 'No matching devices.';
  protected readonly noResultsSubtitle = 'Try a different search term or filter.';

  // Real implementation navigates to the device registration wizard.
  addDevice(): void {
    console.log('Add device');
  }
}
