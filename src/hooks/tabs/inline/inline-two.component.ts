import { Component } from '@angular/core';
import { HeaderModule } from '@c8y/ngx-components';

@Component({
  selector: 'tut-inline2',
  template: `
    <c8y-title>Inline 2 Component </c8y-title>
    <p>Hello from inline tab 2</p>
  `,
  standalone: true,
  imports: [HeaderModule]
})
export class InlineTwo {}
