import { Component, Input, OnInit } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-async-expandable-row-example',
  template: `<div id="{{ context.id }}">Context ID: {{ context.id }}</div>`,
  standalone: true,
  imports: [CoreModule]
})
export class AsyncExpandableRowsComponent implements OnInit {
  @Input() context: any;
  @Input() asyncRenderSuccess: () => void;
  @Input() asyncRenderFail: () => void;

  ngOnInit() {
    // simulate async data loading with a timeout
    setTimeout(() => {
      this.asyncRenderSuccess();
    }, 2000);
  }
}
