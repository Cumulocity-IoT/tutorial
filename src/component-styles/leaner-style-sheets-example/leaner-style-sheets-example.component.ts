import { Component } from '@angular/core';
import { HeaderModule } from '@c8y/ngx-components';

@Component({
  selector: 'tut-leaner-style-sheets-example',
  template: `<c8y-title>LESS component styles</c8y-title>
    <div class="less-example">
      <h5>LESS Styles</h5>
      <p>This is styled with LESS</p>
    </div>`,
  styleUrls: ['./leaner-style-sheets-example.component.less'],
  standalone: true,
  imports: [HeaderModule]
})
export class LeanerStyleSheetsExampleComponent {}
