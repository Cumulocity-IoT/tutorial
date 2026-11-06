// No platform screen fixes the split view columns: this is an example scenario, a device
// overview on a shared control-room display whose layout must not change between users.
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
  selector: 'c8y-split-view-fixed-example',
  templateUrl: './split-view-fixed-example.component.html',
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
export class SplitViewFixedExampleComponent {
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
      section('firmware', gettext('Firmware'), 'c8y-firmware', device.c8y_Firmware.version),
    ];
  });
}

function section(id: string, label: string, icon: string, content: string): IconPanelSection {
  return { id, label, icon, content, visible: true };
}
