import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

/**
 * This is a standard angular component.
 * Obviously it does not do anything.
 * The ExampleTabFactory in ../../hooks/tabs.ts defines two tabs:
 *  - Awesome
 *  - Outstanding
 */
@Component({
  selector: 'awesome',
  templateUrl: './awesome.component.html',
  standalone: true,
  imports: [CoreModule]
})
export class AwesomeComponent {
  /**
   * Your content of the Awesome-Tab goes in here!
   */
}
