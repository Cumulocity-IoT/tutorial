import { Component, inject } from '@angular/core';
import { IconDirective } from '@c8y/ngx-components';
import { RunStateExampleService } from '../run-state/run-state-example.service';

/**
 * The service request action as a "More…" menu row. Overflow items use
 * `btn btn-link`, so they render without a button border inside the dropdown.
 */
@Component({
  selector: 'tut-service-request-menu-item',
  template: `
    <button class="btn btn-link" type="button" (click)="service.createServiceRequest()">
      <i [c8yIcon]="'wrench'" aria-hidden="true"></i>
      Create service request
    </button>
  `,
  imports: [IconDirective],
})
export class ServiceRequestMenuItemComponent {
  protected readonly service = inject(RunStateExampleService);
}
