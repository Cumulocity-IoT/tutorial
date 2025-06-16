import { Component, OnInit } from '@angular/core';
import {
  SetupStep,
  StepperService,
  Steppers,
  TitleComponent,
  StepperOutletComponent
} from '@c8y/ngx-components';
import { firstValueFrom } from 'rxjs';
import { NgIf } from '@angular/common';

/**
 * This is a standard angular component.
 */
@Component({
  selector: 'tut-basic-stepper-hook-view',
  template: `
    <c8y-title>Stepper</c8y-title>
    <div class="card">
      <div class="card-block">
        <p>This is the example of <code>hookStepper</code>.</p>
        <div class="container-fluid" *ngIf="this.steps?.length > 0">
          <c8y-stepper-outlet
            class="d-contents"
            [showDefaultButtons]="false"
            [steps]="steps"
          ></c8y-stepper-outlet>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [TitleComponent, NgIf, StepperOutletComponent]
})
export class BasicViewComponent implements OnInit {
  readonly stepperId = Steppers.SETUP;

  /**
   * All current shown setup steps.
   */
  steps: SetupStep[];

  constructor(private stepperService: StepperService) {}

  async ngOnInit(): Promise<void> {
    const stepsId = 'example'; // `example` is a stepperId value for both steps
    this.steps = (await firstValueFrom(this.stepperService.getById$(stepsId))).map(
      (step: SetupStep, index) => ({
        ...step,
        index,
        completed: false
      })
    );
  }
}
