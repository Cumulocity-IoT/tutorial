// Details actions follow packages/ngx-components/alarms/alarm-details.component.ts; no platform
// screen uses the extra header or the footer, so the device edit form is an example scenario.
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AlertService,
  C8yTranslatePipe,
  DeviceStatusComponent,
  IconDirective,
  ListGroupComponent,
  ListItemBodyComponent,
  ListItemComponent,
  ListItemIconComponent,
  SplitViewAction,
  SplitViewComponent,
  SplitViewDetailsActionsComponent,
  SplitViewDetailsComponent,
  SplitViewExtraHeaderComponent,
  SplitViewFooterComponent,
  SplitViewListComponent,
  SplitViewListItemDirective,
  TitleComponent,
} from '@c8y/ngx-components';
import { gettext } from '@c8y/ngx-components/gettext';
import { ExampleDevice, SplitViewDevicesExampleStore } from '../devices-example.store';

@Component({
  selector: 'c8y-split-view-details-layout-example',
  templateUrl: './split-view-details-layout-example.component.html',
  imports: [
    ReactiveFormsModule,
    C8yTranslatePipe,
    DeviceStatusComponent,
    IconDirective,
    TitleComponent,
    ListGroupComponent,
    ListItemComponent,
    ListItemIconComponent,
    ListItemBodyComponent,
    SplitViewComponent,
    SplitViewListComponent,
    SplitViewListItemDirective,
    SplitViewDetailsComponent,
    SplitViewExtraHeaderComponent,
    SplitViewDetailsActionsComponent,
    SplitViewFooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitViewDetailsLayoutExampleComponent {
  private readonly store = inject(SplitViewDevicesExampleStore);
  private readonly alertService = inject(AlertService);

  protected readonly devices = this.store.devices;
  protected readonly selected = signal<ExampleDevice | null>(null);
  protected readonly name = new FormControl('', {
    nonNullable: true,
    validators: Validators.required,
  });

  protected readonly actions = computed<SplitViewAction[]>(() => {
    const device = this.selected();
    return [
      {
        id: 'restart',
        label: gettext('Restart device'),
        icon: 'refresh',
        class: 'btn btn-default btn-sm',
        disabled: device?.c8y_Availability.status !== 'AVAILABLE',
        visible: true,
        action: () => this.alertService.info(gettext('Restart operation created.')),
      },
    ];
  });

  constructor() {
    effect(() => this.name.reset(this.selected()?.name ?? ''));
  }

  save(): void {
    const device = this.selected();
    if (!device || this.name.invalid) {
      return;
    }
    this.store.rename(device.id, this.name.value);
    this.selected.set({ ...device, name: this.name.value });
  }

  cancel(): void {
    this.name.reset(this.selected()?.name ?? '');
  }
}
