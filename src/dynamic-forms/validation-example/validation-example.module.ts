import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';
import { FormlyFieldConfig, FORMLY_CONFIG } from '@ngx-formly/core';

export function IpValidator(control: AbstractControl): ValidationErrors {
  return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { ip: true };
}

export function IpValidatorMessage(error: any, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid IP Address`;
}

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'dynamic-forms/validation',
      loadComponent: () =>
        import('./validation-example.component').then(m => m.ValidationExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/dynamic-forms/validation',
        label: 'Formly Validation',
        icon: 'hand-o-right',
        priority: 60,
        parent: 'Dynamic forms'
      })
    ),
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useValue: {
        validators: [{ name: 'ip', validation: IpValidator }],
        validationMessages: [{ name: 'ip', message: IpValidatorMessage }]
      }
    }
  ]
})
export class ValidationExampleModule {}
