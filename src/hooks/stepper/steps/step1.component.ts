import { CdkStep } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  C8yStepper,
  FormGroupComponent,
  RequiredInputPlaceholderDirective,
  MessagesComponent,
  MessageDirective,
  C8yStepperButtons
} from '@c8y/ngx-components';

@Component({
  selector: 'tut-step-1-device',
  template: `
    <div class="m-l-40 m-r-40 m-t-32">
      <c8y-form-group>
        <div [formGroup]="formGroupStepOne">
          <label for="name">Enter the device name</label>
          <input
            class="form-control"
            id="name"
            placeholder="MyDevice"
            type="text"
            formControlName="name"
          />
          <c8y-messages>
            <c8y-message [text]="'Enter the name of the Device'"></c8y-message>
          </c8y-messages>
        </div>
      </c8y-form-group>
      <c8y-stepper-buttons
        [showButtons]="{ next: true, cancel: false, back: false, custom: false }"
        [disabled]="!formGroupStepOne.valid"
        (onNext)="goToNextStep($event)"
      ></c8y-stepper-buttons>
    </div>
  `,
  standalone: true,
  imports: [
    FormGroupComponent,
    FormsModule,
    ReactiveFormsModule,
    RequiredInputPlaceholderDirective,
    MessagesComponent,
    MessageDirective,
    C8yStepperButtons
  ]
})
export class Step1Component implements OnInit {
  formGroupStepOne: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroupStepOne = this.fb.group({
      name: ['', Validators.required]
    });
  }

  goToNextStep(event: { stepper: C8yStepper; step: CdkStep }): void {
    console.log('My device name is: ' + this.formGroupStepOne.get('name').value);
    this.formGroupStepOne.reset();
    event.stepper.next();
  }
}
