import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { gettext } from '@c8y/ngx-components/gettext';
import { CoreModule, DynamicFormsModule } from '@c8y/ngx-components';

@Component({
  selector: 'dynamic-form-translation',
  template: `
    <c8y-title>Dynamic form translation</c8y-title>
    <form class="card" [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="card-block">
        <formly-form [form]="form" [fields]="fields"></formly-form>
      </div>
      <div class="card-footer">
        <button class="btn btn-default" title="Reset" type="reset">Reset</button>
        <button class="btn btn-primary" title="Submit" type="submit">Submit</button>
      </div>
    </form>
  `,
  standalone: true,
  imports: [CoreModule, DynamicFormsModule]
})
export class DynamicFormTranslationComponent {
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'radio',
      type: 'radio',
      templateOptions: {
        label: gettext('Select action'),
        description: gettext('some description…'),
        options: [
          {
            value: '1',
            label: gettext('Upload web application')
          },
          {
            value: '2',
            label: gettext('Upload microservice')
          }
        ]
      }
    },
    {
      key: 'text',
      type: 'input',
      templateOptions: {
        label: gettext('Text input'),
        placeholder: gettext('You can provide some examples displayed as placeholder…'),
        description: gettext('…and some short description.')
      }
    }
  ];

  onSubmit() {
    console.log('The form is submitted.');
  }
}
