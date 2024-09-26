import { Component } from '@angular/core';
import { CoreModule, DeviceStatusModule } from '@c8y/ngx-components';

@Component({
  selector: 'tut-device-connection-status-example',
  templateUrl: `./device-connection-status-example.component.html`,
  standalone: true,
  imports: [CoreModule, DeviceStatusModule]
})
export class DeviceConnectionStatusExampleComponent {
  private readonly CONNECTED_AND_AVAILABLE_DEVICE_EXAMPLE = {
    c8y_RequiredAvailability: {},
    c8y_Availability: {
      lastMessage: '2024-01-01T00:00:00.000Z',
      status: 'AVAILABLE'
    },
    c8y_Connection: {
      status: 'CONNECTED'
    }
  };

  private readonly DISCONNECTED_AND_AVAILABLE_DEVICE_EXAMPLE = {
    c8y_RequiredAvailability: {},
    c8y_Availability: {
      lastMessage: '2024-01-01T00:00:00.000Z',
      status: 'AVAILABLE'
    },
    c8y_Connection: {
      status: 'DISCONNECTED'
    }
  };

  private readonly DISCONNECTED_AND_UNAVAILABLE_DEVICE_EXAMPLE = {
    c8y_RequiredAvailability: {},
    c8y_Availability: {
      lastMessage: '2024-01-01T00:00:00.000Z',
      status: 'UNAVAILABLE'
    },
    c8y_Connection: {
      status: 'DISCONNECTED'
    }
  };

  private readonly NOT_MONITORED_DEVICE_EXAMPLE = {
    c8y_RequiredAvailability: {}
  };

  private readonly IN_MAINTENANCE_DEVICE_EXAMPLE = {
    c8y_RequiredAvailability: {},
    c8y_Availability: {
      status: 'MAINTENANCE'
    },
    c8y_Connection: {}
  };

  connectedAndAvailableDeviceExample = this.CONNECTED_AND_AVAILABLE_DEVICE_EXAMPLE;
  disconnectedAndAvailableExample = this.DISCONNECTED_AND_AVAILABLE_DEVICE_EXAMPLE;
  disconnectedAndUnavailableDeviceExample = this.DISCONNECTED_AND_UNAVAILABLE_DEVICE_EXAMPLE;
  notMonitoredDeviceExample = this.NOT_MONITORED_DEVICE_EXAMPLE;
  inMaintenanceDeviceExample = this.IN_MAINTENANCE_DEVICE_EXAMPLE;
}
