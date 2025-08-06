import { Component } from '@angular/core';
import { TitleComponent } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-hook-docs-example',
  imports: [TitleComponent],
  template: `
    <c8y-title>Docs</c8y-title>
    <div class="card">
      <div class="card-block">
        <p>This is the example of <code>hookDocs</code>.</p>
        <p>See the <code>Right drawer</code> in the <code>Documentation</code> section.</p>
      </div>
    </div>
  `
})
export class HookDocsExampleComponent {}
