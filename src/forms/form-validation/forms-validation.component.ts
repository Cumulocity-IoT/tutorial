import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'app-forms-validation-tutorial',
  templateUrl: './forms-validation.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule]
})
export class FormsValidationTutorialComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      eMail: ['', [Validators.required, Validators.email]],
      gender: ['', this.genderValidator()],
      description: ['', [Validators.required, Validators.pattern(/^description[a-z]*$/)]],
      description2: ['', [Validators.required, Validators.pattern(/^description[a-z]*$/)]],
      notes: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });
  }

  save(value) {
    console.log(value);
  }

  formChange() {
    console.log('change');
  }

  genderValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validValues = ['x', 'female', 'male'];
      const currentFormFieldValue = control.value;
      if (validValues.includes(currentFormFieldValue)) {
        return null;
      }
      return { gender: true };
    };
  }
}
