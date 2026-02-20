import { AsyncPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AlertService, DynamicComponent, FormGroupComponent } from '@c8y/ngx-components';
import { WidgetConfigService } from '@c8y/ngx-components/context-dashboard';
import { BehaviorSubject } from 'rxjs';
import { WidgetDemo } from './demo-widget.component';
import { WidgetConfig } from './widget-config.model';

@Component({
  selector: 'c8y-widget-config-demo',
  template: `
    <div class="form-group">
      <c8y-form-group>
        <label>Text</label>
        <textarea style="width: 100%" [formControl]="formGroup.controls.text"></textarea>
      </c8y-form-group>
    </div>

    <ng-template #widgetPreview>
      <c8y-widget-demo [config]="config$ | async"></c8y-widget-demo>
    </ng-template>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  standalone: true,
  imports: [FormGroupComponent, ReactiveFormsModule, WidgetDemo, AsyncPipe]
})
export class WidgetConfigDemo implements DynamicComponent, OnInit {
  /** Configuration passed by the dashboard framework. */
  @Input() config: WidgetConfig = {};

  /** Reactive form group for the widget configuration. */
  formGroup: FormGroup<{ text: FormControl<string | null> }>;

  /** Emits config changes for the preview template. */
  config$ = new BehaviorSubject<WidgetConfig>({});

  private readonly alert = inject(AlertService);
  private readonly widgetConfigService = inject(WidgetConfigService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly form = inject(NgForm);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('widgetPreview')
  set preview(template: TemplateRef<any>) {
    this.widgetConfigService.setPreview(template ?? null);
  }

  ngOnInit(): void {
    // Create form with initial values from config
    this.formGroup = this.formBuilder.group({
      text: [this.config?.text || '', Validators.required]
    });

    // Register form with parent NgForm for validation
    this.form.form.addControl('widgetConfig', this.formGroup);

    // Initialize preview
    this.config$.next(this.config);

    // Update preview when form values change
    this.formGroup.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      this.config$.next({ ...this.config, ...value });
    });

    // Register save callback - validates and merges form values into config
    this.widgetConfigService.addOnBeforeSave(config => {
      if (this.formGroup.invalid) {
        this.alert.warning('Please enter a valid text.');
        return false;
      }
      Object.assign(config, this.formGroup.value);
      return true;
    });
  }
}
