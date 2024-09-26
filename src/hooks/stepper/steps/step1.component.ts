import { CdkStep } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { C8yStepper } from '@c8y/ngx-components';

@Component({
  selector: 'tut-step-1-device',
  template: `
    <div class="m-l-40 m-r-40 m-t-32">
      <h4 class="p-b-8" title="Device name">Enter the device name</h4>
      <c8y-form-group>
        <div [formGroup]="formGroupStepOne">
          <input class="form-control" placeholder="MyDevice" type="text" formControlName="name" />
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
  `
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
