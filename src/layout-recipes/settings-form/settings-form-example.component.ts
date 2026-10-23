import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ActionBarItemComponent,
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  FormGroupComponent,
  IconDirective,
  TitleComponent,
  C8yTranslatePipe,
} from '@c8y/ngx-components';

/** The default values of the Authentication settings page. */
const DEFAULTS = {
  preferredLoginMode: 'OAUTH2_INTERNAL',
  passwordValidityLimit: 0,
  passwordEnforceStrength: true,
  ignoreCase: false,
  forbiddenForWebBrowsers: false,
  forbiddenUserAgents: '',
  useSessionConfiguration: true,
  userAgentValidationRequired: false,
  tfaEnabled: false,
};

@Component({
  selector: 'c8y-settings-form-example',
  templateUrl: './settings-form-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TitleComponent,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    ActionBarItemComponent,
    FormGroupComponent,
    IconDirective,
    ReactiveFormsModule,
    C8yTranslatePipe,
  ],
})
export class SettingsFormExampleComponent {
  // Hardcoded for the example. The real page reads and writes the tenant's auth configuration
  // through TenantOptionsService and the login options endpoint.
  protected readonly form = inject(FormBuilder).group({
    preferredLoginMode: [DEFAULTS.preferredLoginMode, Validators.required],
    passwordValidityLimit: [
      DEFAULTS.passwordValidityLimit,
      [Validators.required, Validators.min(0)],
    ],
    passwordEnforceStrength: [DEFAULTS.passwordEnforceStrength],
    ignoreCase: [DEFAULTS.ignoreCase],
    forbiddenForWebBrowsers: [DEFAULTS.forbiddenForWebBrowsers],
    forbiddenUserAgents: [DEFAULTS.forbiddenUserAgents],
    useSessionConfiguration: [DEFAULTS.useSessionConfiguration],
    userAgentValidationRequired: [DEFAULTS.userAgentValidationRequired],
    tfaEnabled: [DEFAULTS.tfaEnabled],
  });

  save(): void {
    if (this.form.valid) {
      this.form.markAsPristine();
    }
  }

  reload(): void {
    this.form.reset(DEFAULTS);
  }
}
