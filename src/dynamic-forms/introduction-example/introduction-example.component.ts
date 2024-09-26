import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormsModule, HeaderModule } from '@c8y/ngx-components';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'c8y-introduction-example',
  template: `<c8y-title>Dynamic forms: Introduction</c8y-title>
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
  imports: [CommonModule, DynamicFormsModule, HeaderModule]
})
export class IntroductionExampleComponent {
  form = new FormGroup({});
  model = {
    readonly: 'This is a read-only value',
    disabled: 'This is a disabled field',
    'checkbox-disabled': true
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'text',
      type: 'input',
      templateOptions: {
        label: 'Simple text input',
        placeholder: 'Use placeholder to provide an expected value example',
        description: 'If helpful, add&nbsp;<strong>short</strong>&nbspinfo here.'
      }
    },
    {
      key: 'required',
      type: 'input',
      templateOptions: {
        label: 'Required text input',
        placeholder: 'Required value example',
        description:
          'If needed, you can give more context to the user using a popover.&nbsp;<br>&nbsp;You can use&nbsp;<em><strong>HTML</strong></em>&nbsp;markup. The HTML content is sanitized.',
        required: true
      }
    },
    {
      key: 'readonly',
      type: 'input',
      templateOptions: {
        label: 'Read-only text input',
        description: 'This is a read-only field',
        readonly: true
      }
    },
    {
      key: 'disabled',
      type: 'input',
      templateOptions: {
        label: 'Disabled text input',
        description: 'This is a disabled field',
        disabled: true
      }
    },
    {
      key: 'checkbox',
      type: 'checkbox',
      templateOptions: {
        label: 'Checkbox',
        description: 'Checkboxes can have a description too.',
        required: true
      }
    },
    {
      key: 'checkbox-disabled',
      type: 'checkbox',
      templateOptions: {
        label: 'Disabled checkboxes cannot be interacted with',
        disabled: true
      }
    },
    {
      key: 'attachments',
      type: 'file',
      templateOptions: {
        label: 'Attachments',
        description: 'One or more text or image files can be uploaded',
        required: true,
        accept: 'image/*,text/*',
        icon: 'file-text-o',
        alwaysShow: true
      }
    }
  ];

  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}
