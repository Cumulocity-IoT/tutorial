import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { C8yTranslateModule } from '@c8y/ngx-components';
import { FieldType } from '@ngx-formly/core';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'c8y-field-checkbox',
  templateUrl: './checkbox.type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PopoverModule, FormlyModule, C8yTranslateModule, ReactiveFormsModule]
})
export class CustomFieldCheckbox extends FieldType {
  defaultOptions = {
    templateOptions: {
      indeterminate: true,
      formCheck: 'custom'
    }
  };
}
