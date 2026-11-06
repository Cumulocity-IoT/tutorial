import { Injectable, signal } from '@angular/core';
import { AlarmStatusType, IAlarm } from '@c8y/client';

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();

/**
 * Mock alarms in the shape the alarms view receives from the platform, so the split view
 * examples render the same list and details without a tenant.
 */
const EXAMPLE_ALARMS: IAlarm[] = [
  {
    id: '1001',
    severity: 'CRITICAL',
    status: 'ACTIVE',
    type: 'c8y_TemperatureAlarm',
    text: 'Temperature above threshold: 92 °C',
    time: minutesAgo(4),
    firstOccurrenceTime: minutesAgo(95),
    count: 7,
    source: { id: '2001', name: 'Boiler room sensor #3' },
  },
  {
    id: '1002',
    severity: 'MAJOR',
    status: 'ACTIVE',
    type: 'c8y_UnavailabilityAlarm',
    text: 'No data received from device within required interval.',
    time: minutesAgo(32),
    firstOccurrenceTime: minutesAgo(32),
    count: 1,
    source: { id: '2002', name: 'Delivery Truck #1' },
  },
  {
    id: '1003',
    severity: 'MAJOR',
    status: 'ACTIVE',
    type: 'c8y_FirmwareUpdateFailed',
    text: 'Firmware update to 2.4.1 failed: checksum mismatch',
    time: minutesAgo(180),
    firstOccurrenceTime: minutesAgo(180),
    count: 1,
    source: { id: '2003', name: 'Production Line Monitor #1' },
  },
  {
    id: '1004',
    severity: 'MINOR',
    status: 'ACKNOWLEDGED',
    type: 'c8y_BatteryAlarm',
    text: 'Battery level low: 15%',
    time: minutesAgo(420),
    firstOccurrenceTime: minutesAgo(1440),
    count: 3,
    source: { id: '2004', name: 'Wind Mill #1' },
  },
  {
    id: '1005',
    severity: 'WARNING',
    status: 'CLEARED',
    type: 'c8y_DoorAlarm',
    text: 'Door opened outside business hours',
    time: minutesAgo(1500),
    firstOccurrenceTime: minutesAgo(1500),
    count: 1,
    source: { id: '2005', name: 'Warehouse gate controller' },
  },
];

/** Holds the mock alarms so the list and the routed details show the same status changes. */
@Injectable({ providedIn: 'root' })
export class SplitViewAlarmsExampleStore {
  readonly alarms = signal<IAlarm[]>(EXAMPLE_ALARMS);

  find(id: string): IAlarm | undefined {
    return this.alarms().find((alarm) => String(alarm.id) === id);
  }

  setStatus(id: string, status: AlarmStatusType): void {
    this.alarms.update((alarms) =>
      alarms.map((alarm) => (String(alarm.id) === id ? { ...alarm, status } : alarm)),
    );
  }
}
