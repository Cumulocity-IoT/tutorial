import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule, TimePickerModule } from '@c8y/ngx-components';

@Component({
  selector: 'time-picker-example',
  template: `<c8y-title>Time picker</c8y-title>
    <c8y-time-picker [formControl]="form.get('time')"></c8y-time-picker>`,
  standalone: true,
  imports: [TimePickerModule, ReactiveFormsModule, HeaderModule]
})
export class TimePickerExampleComponent {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({});
    this.form.addControl('time', new FormControl(null));
  }
}
