import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

/**
 * This is a standard angular component.
 * Obviously it does not do anything.
 */
@Component({
  selector: 'tut-custom-basic-preview-feature-view',
  templateUrl: './basic-view-custom.component.html',
  standalone: true,
  imports: [CoreModule]
})
export class CustomBasicViewComponent {
  /**
   * Your content of the Basic View goes in here!
   */
}
