import { Component, Input } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-sync-expandable-row-example',
  template: `<div id="{{ context.id }}">Context ID: {{ context.id }}</div>`,
  standalone: true,
  imports: [CoreModule]
})
export class SyncExpandableRowsComponent {
  @Input() context: any;
}
