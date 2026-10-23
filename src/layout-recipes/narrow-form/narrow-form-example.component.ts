import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  FormGroupComponent,
  TitleComponent,
  C8yTranslatePipe,
} from '@c8y/ngx-components';

@Component({
  selector: 'c8y-narrow-form-example',
  templateUrl: './narrow-form-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TitleComponent,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    FormGroupComponent,
    ReactiveFormsModule,
    C8yTranslatePipe,
  ],
})
export class NarrowFormExampleComponent {
  // Hardcoded for the example. The real page is ProviderConfigurationComponent, configured by the
  // SMS gateway module; it stores the credentials through the tenant options endpoint.
  protected readonly form = inject(FormBuilder).group({
    provider: ['', Validators.required],
  });

  save(): void {
    if (this.form.valid) {
      this.form.markAsPristine();
    }
  }

  deleteCredentials(): void {
    this.form.reset({ provider: '' });
  }
}
