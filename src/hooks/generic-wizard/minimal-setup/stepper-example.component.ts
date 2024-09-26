import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { C8yStepper, CoreModule, WizardComponent } from '@c8y/ngx-components';

@Component({
  selector: 'container-component',
  templateUrl: 'stepper-example.component.html',
  standalone: true,
  imports: [CoreModule]
})
export class StepperExampleComponent implements OnInit {
  formGroupStepOne: FormGroup;
  @ViewChild(C8yStepper, { static: true })
  stepper: C8yStepper;
  constructor(
    private wizardComponent: WizardComponent,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formGroupStepOne = this.fb.group({
      name: ['', Validators.required]
    });
  }

  cancel() {
    this.wizardComponent.close('Cancel triggered');
  }

  done() {
    this.wizardComponent.close('Close triggered');
  }
}
