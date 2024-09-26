import { Component } from '@angular/core';
import { BreadcrumbService, CoreModule } from '@c8y/ngx-components';

/**
 * This is a standard angular component.
 * Obviously it does not do anything.
 */
@Component({
  selector: 'tut-basic-breadcrumb-view',
  templateUrl: './basic-view.component.html',
  standalone: true,
  imports: [CoreModule]
})
export class BasicViewComponent {
  /**
   * Your content of the Basic View goes in here!
   */

  constructor(public breadcrumbService: BreadcrumbService) {}
}
