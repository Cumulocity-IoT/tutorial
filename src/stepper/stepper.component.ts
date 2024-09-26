import { Component } from '@angular/core';
import { HeaderModule } from '@c8y/ngx-components';
import { DeviceStepperComponent } from './device-stepper.component';

@Component({
  selector: 'tut-stepper',
  template: `<div class="p-t-16">
    <c8y-title>Stepper</c8y-title>
    <div class="card">
      <div class="card-header separator">
        <h4 class="card-title">Create new device</h4>
      </div>
      <div class="card-block">
        <tut-device-stepper></tut-device-stepper>
      </div>
    </div>
  </div> `,
  standalone: true,
  imports: [HeaderModule, DeviceStepperComponent]
})
export class StepperComponent {}
