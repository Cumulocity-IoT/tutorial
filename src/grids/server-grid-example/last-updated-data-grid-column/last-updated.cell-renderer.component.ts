import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CellRendererContext } from '@c8y/ngx-components';

@Component({
  template: ` {{ context.value | c8yDate }} `,
  selector: 'c8y-last-updated-cell-renderer',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class LastUpdatedCellRendererComponent {
  constructor(public context: CellRendererContext) {}
}
