import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-date-translation',
  template: `
    <c8y-title>Date translation by c8yDate pipe</c8y-title>
    <div class="card">
      <div class="card-block">
        <div>This date will be translated: {{ currentDate | c8yDate }}.</div>
        <div>
          This date exceeding the range supported by ECMAScript will be translated:
          {{ 8640000000000000 + 1 | c8yDate }}.
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CoreModule]
})
export class C8yDateTranslationComponent {
  currentDate = new Date();
}
