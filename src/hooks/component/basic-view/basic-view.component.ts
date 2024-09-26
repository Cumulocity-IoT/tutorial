import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

/**
 * This is a standard angular component.
 * Obviously it does not do anything.
 */
@Component({
  selector: 'tut-basic-component-hook-view',
  templateUrl: './basic-view.component.html',
  standalone: true,
  imports: [CoreModule]
})
export class BasicViewComponent {
  editComponent = false;
}
