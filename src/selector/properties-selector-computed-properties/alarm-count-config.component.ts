import { Component, inject, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  NgForm,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { C8yTranslatePipe, CommonModule, CoreModule } from '@c8y/ngx-components';
import { DatapointSelectorModule } from '@c8y/ngx-components/datapoint-selector';
import { Observable } from 'rxjs';
import { AlarmCountLastWeekConfig } from './alarm-count-last-week-computed-property';

@Component({
  selector: 'c8y-alarm-count-config',
  template: `
    <form class="row d-flex-md" [formGroup]="formGroup">
      <div class="col-md-6">
        <c8y-form-group class="m-b-16">
          <label [title]="'Alarm type' | translate" translate> Alarm type </label>
          <input
            class="form-control"
            placeholder="{{ 'e.g.' | translate }} c8y_UnavailabilityAlarm"
            name="type"
            type="string"
            formControlName="type"
          />
          <c8y-messages
            [show]="formGroup.controls?.type?.touched && formGroup?.controls?.type?.errors"
          ></c8y-messages>
        </c8y-form-group>
      </div>
    </form>
  `,
  imports: [
    CoreModule,
    DatapointSelectorModule,
    CommonModule,
    C8yTranslatePipe,
    ReactiveFormsModule
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ComputedPropertyAlarmCountConfigComponent implements OnInit {
  @Input() config?: AlarmCountLastWeekConfig;
  formGroup: ReturnType<ComputedPropertyAlarmCountConfigComponent['createForm']>;

  private formBuilder = inject(FormBuilder);
  private form = inject(NgForm);

  ngOnInit() {
    this.initForm();
  }

  onBeforeSave(
    config?: AlarmCountLastWeekConfig
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (this.formGroup.valid) {
      Object.assign(config, this.formGroup.value);
      return true;
    }
    return false;
  }

  private initForm(): void {
    this.formGroup = this.createForm();
    this.form.form.addControl('config', this.formGroup);
    this.formGroup.patchValue(this.config);
  }

  private createForm() {
    return this.formBuilder.group({
      type: ['', [Validators.required]]
    });
  }
}
