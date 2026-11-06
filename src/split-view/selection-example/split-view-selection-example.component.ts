// No platform screen selects split view items without the router: this is an example scenario.
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  C8yTranslatePipe,
  DeviceStatusComponent,
  IconPanelComponent,
  IconPanelSection,
  SplitViewComponent,
  SplitViewDetailsComponent,
  SplitViewListComponent,
  SplitViewListItemDirective,
  TitleComponent,
} from '@c8y/ngx-components';
import { gettext } from '@c8y/ngx-components/gettext';
import { ExampleDevice, SplitViewDevicesExampleStore } from '../devices-example.store';

@Component({
  selector: 'c8y-split-view-selection-example',
  templateUrl: './split-view-selection-example.component.html',
  imports: [
    C8yTranslatePipe,
    DeviceStatusComponent,
    IconPanelComponent,
    TitleComponent,
    SplitViewComponent,
    SplitViewListComponent,
    SplitViewListItemDirective,
    SplitViewDetailsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitViewSelectionExampleComponent {
  protected readonly devices = inject(SplitViewDevicesExampleStore).devices;
  protected readonly selected = signal<ExampleDevice | null>(null);

  protected readonly sections = computed<IconPanelSection[]>(() => {
    const device = this.selected();
    if (!device) {
      return [];
    }
    return [
      section(
        'availability',
        gettext('Availability'),
        'c8y-device-connect',
        device.c8y_Availability.status,
      ),
      section('model', gettext('Model'), 'c8y-device', device.c8y_Hardware.model),
      section('serial', gettext('Serial number'), 'barcode', device.c8y_Hardware.serialNumber),
      section('firmware', gettext('Firmware'), 'c8y-firmware', device.c8y_Firmware.version),
    ];
  });
}

function section(id: string, label: string, icon: string, content: string): IconPanelSection {
  return { id, label, icon, content, visible: true };
}
