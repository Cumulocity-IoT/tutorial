import { Component } from '@angular/core';
import { HeaderModule } from '@c8y/ngx-components';

@Component({
  selector: 'tut-cascading-style-sheets-example',
  template: `<c8y-title>CSS component styles</c8y-title>
    <div class="css-example">
      <h5>CSS Styles</h5>
      <p>This is styled with plain CSS using CSS variables</p>
    </div>`,
  styleUrls: ['./cascading-style-sheets-example.component.css'],
  standalone: true,
  imports: [HeaderModule]
})
export class CascadingStyleSheetsExampleComponent {}
