import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '@c8y/ngx-components';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'c8y-custom-element-example',
  template: `<c8y-title>Dynamic forms: Custom element</c8y-title>
    <div class="row">
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6">
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
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6">
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
export class CustomElementExampleComponent {
  readonly pageTitle = 'Dynamic forms';
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'custom',
      type: 'custom',
      templateOptions: {
        label: 'Custom checkbox',
        description: 'This custom checkbox always displays its label in UPPERCASE.'
      }
    },
    {
      key: 'checkbox',
      type: 'checkbox',
      templateOptions: {
        label: 'Standard checkbox'
      }
    },
    {
      key: 'text',
      type: 'input',
      templateOptions: {
        label: 'Simple text input',
        placeholder: 'You can provide some examples displayed as placeholder…',
        description: '…and some short description.'
      }
    }
  ];

  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}
