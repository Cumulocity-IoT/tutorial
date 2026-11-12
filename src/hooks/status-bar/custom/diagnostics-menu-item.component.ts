import { Component, inject } from '@angular/core';
import { IconDirective } from '@c8y/ngx-components';
import { RunStateExampleService } from '../run-state/run-state-example.service';

/**
 * Second "More…" menu row, so the example shows an overflow menu rather than a
 * single item, which the bar renders inline.
 */
@Component({
  selector: 'tut-diagnostics-menu-item',
  template: `
    <button class="btn btn-link" type="button" (click)="service.downloadDiagnostics()">
      <i [c8yIcon]="'download'" aria-hidden="true"></i>
      Download diagnostics
    </button>
  `,
  imports: [IconDirective],
})
export class DiagnosticsMenuItemComponent {
  protected readonly service = inject(RunStateExampleService);
}
