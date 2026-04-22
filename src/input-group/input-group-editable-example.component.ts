import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { CoreModule, InputGroupEditableComponent } from '@c8y/ngx-components';
import { Observable, map, timer } from 'rxjs';

@Component({
  selector: 'c8y-input-group-editable-example',
  template: `
    <c8y-title>Inline editable input</c8y-title>
    <div class="container-fluid p-24">
      <!-- SIZES -->
      <h4 class="text-medium m-b-24">Sizes</h4>
      <div class="row m-b-24">
        <div class="col-sm-4">
          <p class="text-label-small">Default</p>
          <c8y-input-group-editable
            ariaLabel="Default size"
            [(ngModel)]="sizeDefault"
          ></c8y-input-group-editable>
        </div>
        <div class="col-sm-4">
          <p class="text-label-small">Small (size="sm")</p>
          <c8y-input-group-editable
            size="sm"
            ariaLabel="Small size"
            [(ngModel)]="sizeSm"
          ></c8y-input-group-editable>
        </div>
        <div class="col-sm-4">
          <p class="text-label-small">Large (size="lg")</p>
          <c8y-input-group-editable
            size="lg"
            ariaLabel="Large size"
            [(ngModel)]="sizeLg"
          ></c8y-input-group-editable>
        </div>
      </div>

      <hr />

      <!-- BINDING PATTERNS -->
      <h4 class="text-medium m-b-24">Binding patterns</h4>
      <div class="row m-b-24">
        <div class="col-sm-4">
          <p class="text-label-small">Two-way [(ngModel)]</p>
          <c8y-input-group-editable
            ariaLabel="Two-way ngModel"
            [(ngModel)]="bindingTwoWay"
          ></c8y-input-group-editable>
          <small class="text-muted">Value: {{ bindingTwoWay }}</small>
        </div>
        <div class="col-sm-4">
          <p class="text-label-small">[ngModel] and (ngModelChange)</p>
          <c8y-input-group-editable
            ariaLabel="One-way ngModel with ngModelChange"
            [ngModel]="bindingOneWay"
            (ngModelChange)="bindingOneWay = $event"
          ></c8y-input-group-editable>
          <small class="text-muted">Value: {{ bindingOneWay }}</small>
        </div>
        <div class="col-sm-4">
          <p class="text-label-small">[formControl]</p>
          <c8y-input-group-editable
            ariaLabel="Form control binding"
            [formControl]="bindingFormControl"
          ></c8y-input-group-editable>
          <small class="text-muted">Value: {{ bindingFormControl.value }}</small>
          <p class="text-muted m-t-4">
            <small
              >Use <code>formControlName</code> the same way inside a <code>FormGroup</code>.</small
            >
          </p>
        </div>
      </div>

      <hr />

      <!-- OUTPUTS -->
      <h4 class="text-medium m-b-24">Outputs — (save) and (cancel)</h4>
      <div class="row m-b-24">
        <div class="col-sm-6">
          <p class="text-label-small">Tracking last action alongside [(ngModel)]</p>
          <c8y-input-group-editable
            ariaLabel="Field with save and cancel outputs"
            [(ngModel)]="outputsModel"
            (save)="onSave($event)"
            (cancel)="onCancel()"
          ></c8y-input-group-editable>
          <div class="m-t-8">
            <small class="d-block text-muted"
              >Last action: <strong>{{ lastAction || '—' }}</strong></small
            >
            <small class="d-block text-muted"
              >Last saved value: <strong>{{ lastSavedValue || '—' }}</strong></small
            >
          </div>
        </div>
      </div>

      <hr />

      <!-- PLACEHOLDER AND NAME -->
      <h4 class="text-medium m-b-24">Placeholder and name</h4>
      <div class="row m-b-24">
        <div class="col-sm-4">
          <p class="text-label-small">Empty field with placeholder</p>
          <c8y-input-group-editable
            placeholder="e.g. My device"
            name="device-name"
            ariaLabel="Device name"
            [(ngModel)]="placeholderModel"
          ></c8y-input-group-editable>
        </div>
      </div>

      <hr />

      <!-- SYNC VALIDATION -->
      <h4 class="text-medium m-b-24">Validation — synchronous</h4>
      <div class="row m-b-24">
        <div class="col-sm-4">
          <p class="text-label-small">Template-driven (required, minlength)</p>
          <c8y-input-group-editable
            required
            minlength="3"
            ariaLabel="Template-driven validation"
            [(ngModel)]="validTplModel"
          ></c8y-input-group-editable>
        </div>
        <div class="col-sm-4">
          <p class="text-label-small">[validators] input — no spaces</p>
          <c8y-input-group-editable
            ariaLabel="Validators input"
            [(ngModel)]="validatorsModel"
            [validators]="noSpacesValidator"
          >
            <c8y-message
              name="noSpaces"
              [text]="'Spaces are not allowed.' | translate"
            ></c8y-message>
          </c8y-input-group-editable>
        </div>
        <div class="col-sm-4">
          <p class="text-label-small">[formControl] and &lt;c8y-message&gt;</p>
          <c8y-input-group-editable
            ariaLabel="FormControl with custom messages"
            [formControl]="validFormControl"
          >
            <c8y-message
              name="required"
              [text]="'This field is required.' | translate"
            ></c8y-message>
            <c8y-message
              name="minlength"
              [text]="'Minimum 3 characters required.' | translate"
            ></c8y-message>
          </c8y-input-group-editable>
        </div>
      </div>

      <hr />

      <!-- ASYNC VALIDATION -->
      <h4 class="text-medium m-b-24">Validation — asynchronous</h4>
      <div class="row m-b-24">
        <div class="col-sm-4">
          <p class="text-label-small">[asyncValidators] — try typing "taken"</p>
          <c8y-input-group-editable
            ariaLabel="Async uniqueness validation"
            [formControl]="asyncFormControl"
            [asyncValidators]="uniquenessValidator"
          >
            <c8y-message
              name="notUnique"
              [text]="'This name is already taken.' | translate"
            ></c8y-message>
          </c8y-input-group-editable>
        </div>
      </div>

      <hr />

      <!-- DISABLED STATE -->
      <h4 class="text-medium m-b-24">Disabled state</h4>
      <div class="row m-b-24">
        <div class="col-sm-4">
          <p class="text-label-small">disabled attribute</p>
          <c8y-input-group-editable
            disabled
            ariaLabel="Disabled field"
            [(ngModel)]="disabledModel"
          ></c8y-input-group-editable>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CoreModule, InputGroupEditableComponent]
})
export class InputGroupEditableExampleComponent {
  // Sizes
  sizeDefault = 'Default size';
  sizeSm = 'Small size';
  sizeLg = 'Large size';

  // Binding patterns
  bindingTwoWay = 'Two-way binding';
  bindingOneWay = 'One-way binding';
  readonly bindingFormControl = new FormControl('Form control value', { nonNullable: true });

  // Outputs
  outputsModel = 'Edit and save or cancel';
  lastAction = '';
  lastSavedValue = '';

  // Placeholder and name
  placeholderModel = '';

  // Sync validation — template-driven (required + minlength attributes)
  validTplModel = 'min 3 chars required';

  // Sync validation — [validators] input
  validatorsModel = 'NoSpacesAllowed';

  // Sync validation — [formControl] with custom <c8y-message> children
  readonly validFormControl = new FormControl('min 3 chars required', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true
  });

  // Disabled state
  disabledModel = 'Read-only value';

  // Async validation — simulates a server-side uniqueness check
  readonly asyncFormControl = new FormControl('available', { nonNullable: true });

  readonly noSpacesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
    /\s/.test(control.value) ? { noSpaces: true } : null;
  readonly uniquenessValidator: AsyncValidatorFn = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    const takenNames = ['taken', 'admin', 'root'];
    return timer(800).pipe(
      map(() => (takenNames.includes(control.value?.toLowerCase()) ? { notUnique: true } : null))
    );
  };

  onSave(value: string): void {
    this.lastAction = 'Saved';
    this.lastSavedValue = value;
  }

  onCancel(): void {
    this.lastAction = 'Cancelled';
  }
}
