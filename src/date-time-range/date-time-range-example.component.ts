import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { C8yTranslateModule, CommonModule, FormsModule, HeaderModule } from '@c8y/ngx-components';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DateTimePickerModule } from '@c8y/ngx-components';

@Component({
  selector: 'date-time-range-example',
  template: `
    <c8y-title>Date time range</c8y-title>
    <div class="p-24">
      <form class="d-flex-sm a-i-center-sm" [formGroup]="form">
        <label class="m-r-sm-8">{{ 'Range' | translate }}</label>
        <div
          class="dropdown m-r-4 m-t-xs-4 m-b-xs-4"
          #dropdown="bs-dropdown"
          dropdown
          [insideClick]="true"
        >
          <button
            class="dropdown-toggle form-control l-h-1 d-flex a-i-center"
            title="{{ form.value.dateFrom | c8yDate: 'short' }} — {{
              form.value.dateTo | c8yDate: 'short'
            }}"
            aria-haspopup="true"
            dropdownToggle
          >
            <span data-cy="widget-time-context--selected-time-range">
              {{ form.value.dateFrom | c8yDate: 'shortDate' }} —
              {{ form.value.dateTo | c8yDate: 'shortDate' }}
            </span>
            <span class="caret m-r-8 m-l-4"></span>
          </button>

          <div class="dropdown-menu dropdown-menu--date-range" *dropdownMenu>
            <div class="p-16">
              <c8y-form-group [ngClass]="form.controls.dateFrom.errors ? 'has-error' : ''">
                <label [title]="'From\`date\`' | translate" for="dateFrom" translate>
                  From\`date\`
                </label>
                <c8y-date-time-picker
                  id="dateFrom"
                  [maxDate]="form.value.dateTo"
                  [placeholder]="'From\`date\`' | translate"
                  [formControl]="form.controls.dateFrom"
                  [ngClass]="form.controls.dateFrom.errors ? 'has-error' : ''"
                ></c8y-date-time-picker>
                <c8y-messages [show]="form.controls.dateFrom.errors">
                  <c8y-message
                    name="dateAfterRangeMax"
                    [text]="'This date is after the last allowed date.' | translate"
                  ></c8y-message>
                  <c8y-message
                    name="invalidDateTime"
                    [text]="'This date is invalid.' | translate"
                  ></c8y-message>
                </c8y-messages>
              </c8y-form-group>

              <c8y-form-group [ngClass]="form.controls.dateTo.errors ? 'has-error' : ''">
                <label [title]="'To\`date\`' | translate" for="dateTo" translate>To\`date\`</label>
                <c8y-date-time-picker
                  id="dateTo"
                  [minDate]="form.value.dateFrom"
                  [placeholder]="'To\`date\`' | translate"
                  [formControl]="form.controls.dateTo"
                  [ngClass]="form.controls.dateTo.errors ? 'has-error' : ''"
                ></c8y-date-time-picker>
                <c8y-messages [show]="form.controls.dateTo.errors">
                  <c8y-message
                    name="dateBeforeRangeMin"
                    [text]="'This date is before the earliest allowed date.' | translate"
                  ></c8y-message>
                  <c8y-message
                    name="invalidDateTime"
                    [text]="'This date is invalid.' | translate"
                  ></c8y-message>
                </c8y-messages>
              </c8y-form-group>
            </div>
          </div>
        </div>
      </form>
    </div>
  `,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderModule,
    BsDropdownModule,
    C8yTranslateModule,
    CommonModule,
    DateTimePickerModule,
    FormsModule
  ]
})
export class DateTimeRangeExampleComponent {
  form: FormGroup;
  constructor() {
    const dateTo = new Date();
    const dateFrom = new Date(dateTo.valueOf() - 24 * 60 * 60 * 1000);
    this.form = new FormGroup({
      dateFrom: new FormControl(dateFrom.toISOString()),
      dateTo: new FormControl(dateTo.toISOString())
    });
  }
}
