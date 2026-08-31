import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-expandable-row-example',
  template: `<div id="{{ context.id }}">Context ID: {{ context.id }}</div>`,
  standalone: true,
  imports: [CoreModule],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ExpandableRowsComponent {
  @Input() context: any;
}
