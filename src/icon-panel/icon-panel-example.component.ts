import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconPanelComponent, IconPanelSection, TitleComponent } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-icon-panel-example',
  templateUrl: './icon-panel-example.component.html',
  standalone: true,
  imports: [CommonModule, IconPanelComponent, TitleComponent]
})
export class IconPanelExampleComponent {
  deviceSections: IconPanelSection[] = [
    {
      id: 'device-info',
      label: 'Device Information',
      icon: 'c8y-device',
      visible: true,
      content: `
        <div>
          <p class="m-b-4"><strong>Model:</strong> Smart Thermostat Pro</p>
          <p class="m-b-4"><strong>Serial:</strong> THM-001-2024</p>
          <p class="m-b-0"><strong>Firmware:</strong> v2.4.1</p>
        </div>
      `,
      colClass: 'col-xs-12 col-md-6'
    },
    {
      id: 'location',
      label: 'Location',
      icon: 'map-marker',
      visible: true,
      content: `
        <div>
          <p class="m-b-4">Building A - Floor 1</p>
          <p class="m-b-0"><small class="text-muted">Room 101</small></p>
        </div>
      `,
      colClass: 'col-xs-12 col-md-6'
    },
    {
      id: 'connection',
      label: 'Connection Status',
      icon: 'contactless-payment',
      visible: true,
      content:
        '<p class="m-b-0"><strong class="text-success">Online</strong> - Last seen 2 minutes ago</p>',
      colClass: 'col-xs-12 col-md-4',
      iconClass: 'text-success'
    },
    {
      id: 'battery',
      label: 'Battery Level',
      icon: 'battery-full',
      visible: true,
      content: '<p class="m-b-0"><strong class="text-success">98%</strong> - Charging</p>',
      colClass: 'col-xs-12 col-md-4',
      iconClass: 'text-success'
    },
    {
      id: 'signal',
      label: 'Signal Strength',
      icon: 'signal',
      visible: true,
      content: '<p class="m-b-0"><strong class="text-warning">Medium</strong> - 3/5 bars</p>',
      colClass: 'col-xs-12 col-md-4',
      iconClass: 'text-warning'
    }
  ];

  alarmSections: IconPanelSection[] = [
    {
      id: 'critical',
      label: 'Critical Alarms',
      icon: 'exclamation-circle',
      visible: true,
      content: '<span class="badge badge-danger">2</span> active',
      colClass: 'col-xs-12 col-sm-6 col-md-3',
      iconClass: 'status critical stroked-icon'
    },
    {
      id: 'major',
      label: 'Major Alarms',
      icon: 'warning',
      visible: true,
      content: '<span class="badge badge-warning">5</span> active',
      colClass: 'col-xs-12 col-sm-6 col-md-3',
      iconClass: 'status major stroked-icon'
    },
    {
      id: 'minor',
      label: 'Minor Alarms',
      icon: 'high-priority',
      visible: true,
      content: '<span class="badge badge-info">12</span> active',
      colClass: 'col-xs-12 col-sm-6 col-md-3',
      iconClass: 'status minor stroked-icon'
    },
    {
      id: 'cleared',
      label: 'Cleared today',
      icon: 'ok',
      visible: true,
      content: '<span class="badge badge-success">28</span> cleared',
      colClass: 'col-xs-12 col-sm-6 col-md-3',
      iconClass: 'text-success'
    }
  ];
}
