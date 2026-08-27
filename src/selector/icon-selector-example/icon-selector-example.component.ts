import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { C8yTranslatePipe, IconDirective, TitleComponent } from '@c8y/ngx-components';
import {
  IconSelectorComponent,
  IconSelectorWrapperComponent,
} from '@c8y/ngx-components/icon-selector';

@Component({
  selector: 'c8y-icon-selector-example',
  templateUrl: './icon-selector-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    C8yTranslatePipe,
    IconDirective,
    TitleComponent,
    IconSelectorComponent,
    IconSelectorWrapperComponent,
  ],
})
export class IconSelectorExampleComponent {
  /** Last icon chosen from the inline selector grid. */
  protected readonly selectedIcon = signal<string | undefined>(undefined);

  /** Form-bound icon selection driven by the icon-selector wrapper. */
  protected readonly form = new FormGroup({
    icon: new FormControl('c8y-device'),
  });

  protected onSelect(icon: string | undefined): void {
    this.selectedIcon.set(icon);
  }
}
