import { Component } from '@angular/core';
import { HeaderModule } from '@c8y/ngx-components';

@Component({
  selector: 'tut-syntactically-awesome-style-sheets-example',
  template: `<c8y-title>SCSS component styles</c8y-title>
    <div class="scss-example">
      <h5>SCSS Styles</h5>
      <p>This is styled with SCSS</p>
    </div>`,
  styleUrls: ['./syntactically-awesome-style-sheets-example.component.scss'],
  standalone: true,
  imports: [HeaderModule]
})
export class SyntacticallyAwesomeStyleSheetsExampleComponent {}
