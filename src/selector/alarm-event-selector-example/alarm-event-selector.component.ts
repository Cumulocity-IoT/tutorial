import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule, CoreModule } from '@c8y/ngx-components';
import {
  AlarmEventSelectorModule,
  AlarmOrEvent,
  AlarmEventSelectorModalOptions
} from '@c8y/ngx-components/alarm-event-selector';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';

@Component({
  selector: 'app-widget',
  template: `
    <div class="row">
      <div class="col-md-6">
        <form [formGroup]="formGroup">
          <c8y-alarm-event-selection-list
            name="alarms"
            [config]="config"
            [timelineType]="'ALARM'"
            formControlName="alarms"
          >
          </c8y-alarm-event-selection-list>
          <c8y-alarm-event-selection-list
            name="events"
            [config]="config"
            [timelineType]="'EVENT'"
            formControlName="events"
          >
          </c8y-alarm-event-selection-list>
        </form>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, AssetSelectorModule, CoreModule, AlarmEventSelectorModule]
})
export class AlarmEventSelectorExampleComponent {
  selectedAlarmEvent: AlarmOrEvent;
  formGroup: FormGroup;
  @Input() config: Partial<AlarmEventSelectorModalOptions> = {};

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      alarms: [[]],
      events: [[]]
    });
  }
}
