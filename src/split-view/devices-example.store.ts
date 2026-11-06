import { Injectable, signal } from '@angular/core';
import { IManagedObject, IManagedObjectReferences } from '@c8y/client';

/** Device managed objects with the fragments the device list and device info show. */
export type ExampleDevice = IManagedObject & {
  c8y_Hardware: { model: string; serialNumber: string };
  c8y_Firmware: { version: string };
  c8y_Availability: { status: 'AVAILABLE' | 'UNAVAILABLE' | 'MAINTENANCE' };
  c8y_RequiredAvailability: { responseInterval: number };
};

const created = new Date(Date.now() - 30 * 86_400_000).toISOString();
const noReferences = (id: string, kind: string): IManagedObjectReferences => ({
  references: [],
  self: `/inventory/managedObjects/${id}/${kind}`,
});

const device = (
  id: string,
  name: string,
  type: string,
  model: string,
  firmware: string,
  status: ExampleDevice['c8y_Availability']['status'],
): ExampleDevice => ({
  id,
  name,
  type,
  self: `/inventory/managedObjects/${id}`,
  owner: 'device_' + id,
  creationTime: created,
  lastUpdated: created,
  additionParents: noReferences(id, 'additionParents'),
  assetParents: noReferences(id, 'assetParents'),
  childAdditions: noReferences(id, 'childAdditions'),
  childAssets: noReferences(id, 'childAssets'),
  childDevices: noReferences(id, 'childDevices'),
  deviceParents: noReferences(id, 'deviceParents'),
  c8y_IsDevice: {},
  c8y_Hardware: { model, serialNumber: `SN-${id}` },
  c8y_Firmware: { version: firmware },
  c8y_Availability: { status },
  c8y_Connection: { status: status === 'AVAILABLE' ? 'CONNECTED' : 'DISCONNECTED' },
  c8y_RequiredAvailability: { responseInterval: 60 },
});

/** Holds the mock devices so edits made in one example pane show in the list. */
@Injectable({ providedIn: 'root' })
export class SplitViewDevicesExampleStore {
  readonly devices = signal<ExampleDevice[]>([
    device('3001', 'Delivery Truck #1', 'c8y_Tracker', 'Queclink GV300', '2.4.1', 'AVAILABLE'),
    device('3002', 'Wind Mill #1', 'c8y_WindTurbine', 'Vestas V150', '1.9.0', 'UNAVAILABLE'),
    device(
      '3003',
      'Boiler room sensor #3',
      'c8y_TemperatureSensor',
      'Bosch BME680',
      '3.0.2',
      'AVAILABLE',
    ),
    device(
      '3004',
      'Production Line Monitor #1',
      'c8y_Linux',
      'Raspberry Pi 4',
      '5.15.0',
      'MAINTENANCE',
    ),
    device(
      '3005',
      'Warehouse gate controller',
      'c8y_AccessControl',
      'Siemens S7-1200',
      '4.5.0',
      'AVAILABLE',
    ),
  ]);

  rename(id: string, name: string): void {
    this.devices.update((devices) => devices.map((d) => (d.id === id ? { ...d, name } : d)));
  }
}
