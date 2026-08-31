import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

/**
 * This is a standard angular component.
 * Obviously it does not do anything.
 */
@Component({
  selector: 'tut-additional-config-component',
  template: 'Any additional configuration can be done here.',
  standalone: true,
  imports: [CoreModule],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AdditionalConfigComponent {
  editComponent = false;
}
