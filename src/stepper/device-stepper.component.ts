import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { C8yStepper, CoreModule } from '@c8y/ngx-components';
import { StepperService } from './stepper.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { upperFirst } from 'lodash';

enum step {
  FIRST = 0,
  SECOND = 1,
  THIRD = 2
}
@Component({
  selector: 'tut-device-stepper',
  templateUrl: './device-stepper.component.html',
  standalone: true,
  imports: [CoreModule, FormsModule, ReactiveFormsModule]
})
export class DeviceStepperComponent implements OnInit {
  @ViewChild(C8yStepper, { static: true })
  private stepper: C8yStepper;

  formGroupStepOne: FormGroup;
  formGroupStepTwo: FormGroup;
  isModal: boolean;
  pendingStatus = false;

  private onClose: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private stepperService: StepperService,
    private bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.formGroupStepOne = this.fb.group({
      name: ['', Validators.required]
    });

    this.formGroupStepTwo = this.fb.group({
      type: ['']
    });
  }

  navigate(clickedStepIDX: number): void {
    console.log('Index is: ', clickedStepIDX);
  }

  onMovingForward(clickedStepIDX: number, selectedStepIDX: number): void {
    this.stepper.next();
    if (clickedStepIDX === step.THIRD && selectedStepIDX === step.SECOND) {
      this.save();
    }
  }

  onMovingBackward(clickedStepIDX: number, selectedStepIDX: number): void {
    if ((clickedStepIDX === step.FIRST || step.SECOND) && selectedStepIDX === step.THIRD) {
      this.resetStepper();
    } else if (clickedStepIDX === step.FIRST && selectedStepIDX === step.SECOND) {
      this.stepper.previous();
    }
  }

  async save(): Promise<void> {
    this.pendingStatus = true;
    await this.addDevice();
    this.pendingStatus = false;
    this.stepper.next();
  }

  close(isModal: boolean): void {
    if (isModal) {
      this.onClose.next(null);
      this.bsModalRef.hide();
    } else {
      this.resetStepper();
    }
  }

  private async addDevice(): Promise<void> {
    await this.stepperService.addDevice({
      id: Math.random() * 1000,
      name: upperFirst(this.formGroupStepOne.get('name').value),
      type: upperFirst(this.formGroupStepTwo.get('type').value)
    });
  }

  private resetStepper(): void {
    this.stepper.reset();
    this.stepper.selectedIndex = 1;
  }
}
