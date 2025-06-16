import { Component } from '@angular/core';
import { C8yStepperButtons } from '@c8y/ngx-components';

@Component({
  selector: 'tut-step-2-device',
  template: `
    <div class="m-l-40 m-r-40 m-t-32">
      <h4 class="p-b-32 text-center">Your device is now ready to save the world!</h4>
    </div>
    <c8y-stepper-buttons
      [showButtons]="{ next: false, cancel: false, back: true, custom: false }"
      [labels]="{ back: 'Got it!' }"
    ></c8y-stepper-buttons>
  `,
  standalone: true,
  imports: [C8yStepperButtons]
})
export class Step2Component {
  close() {
    //
  }
}
