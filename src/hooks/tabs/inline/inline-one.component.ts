import { Component } from '@angular/core';
import { HeaderModule } from '@c8y/ngx-components';

@Component({
  selector: 'tut-inline1',
  template: `
    <c8y-title>Inline 1 Component </c8y-title>
    <p>Hello from inline tab 1</p>
  `,
  standalone: true,
  imports: [HeaderModule]
})
export class InlineOne {}
