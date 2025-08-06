import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { HeaderModule } from '@c8y/ngx-components';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { delay, of } from 'rxjs';

export function ipValidator(control: AbstractControl): ValidationErrors {
  return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { ip: true };
}

@Component({
  selector: 'c8y-validation-example',
  template: `<c8y-title>Dynamic forms: Validation</c8y-title>
    <div class="row">
      <div class="col-xs-12 col-md-7 col-lg-6">
        <form class="card" [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="card-block">
            <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
          </div>
          <div class="card-footer">
            <button class="btn btn-default" title="Reset" type="reset">Reset</button>
            <button class="btn btn-primary" title="Submit" type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div class="col-xs-12 col-md-5 col-lg-6">
        <div class="card">
          <div class="card-block">
            <div class="legend form-block">Model</div>
            <pre style="min-height: 98px;"><code>{{ model | json }}</code></pre>
          </div>
        </div>
      </div>
    </div> `,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, HeaderModule]
})
export class ValidationExampleComponent {
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'built-in',
      type: 'input',
      props: {
        label: 'Built-in validators',
        placeholder: 'Between 0 and 10',
        description: 'This field uses Formly built-in validators',
        required: true,
        min: 0,
        max: 10
      }
    },
    {
      key: 'ip',
      type: 'input',
      props: {
        label: 'IP address',
        placeholder: '192.168.0.1',
        description: 'Uses custom validator declared in NgModule'
      },
      validators: {
        validation: ['ip']
      }
    },
    {
      key: 'subnet-mask',
      type: 'input',
      props: {
        label: 'Subnet mask',
        placeholder: '255.255.254.0',
        description: 'Uses custom validation through <code>validators.expression</code> property'
      },
      validators: {
        snmask: {
          expression: (c: AbstractControl) =>
            !c.value ||
            /(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))/.test(
              c.value
            ),
          message: (error: object, field: FormlyFieldConfig) =>
            `"${field.formControl.value}" is not a valid subnet mask`
        }
      }
    },
    {
      key: 'dns',
      type: 'input',
      templateOptions: {
        label: 'DNS',
        placeholder: '1.1.1.1',
        description: 'Uses custom validation through <code>validators.validation</code> property'
      },
      validators: {
        validation: [ipValidator]
      }
    },
    {
      key: 'username',
      type: 'input',
      props: {
        label: 'Username',
        placeholder: 'Spider-Man',
        description: 'Username is checked for uniqueness asynchronously'
      },
      asyncValidators: {
        uniqueUsername: {
          expression: (control: AbstractControl) =>
            of(
              ['Spider-Man', 'Wonder Woman', 'Batman', 'Iron Man'].indexOf(control.value) === -1
            ).pipe(delay(1000)),
          message: (error: any, field: FormlyFieldConfig) =>
            `${field.formControl.value} is already taken.`
        }
      }
    }
  ];

  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}
