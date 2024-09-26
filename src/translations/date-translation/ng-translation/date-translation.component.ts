import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'date-translation',
  template: `<c8y-title>Date translation by Angular pipe</c8y-title>
    <div class="card">
      <div class="card-block">
        This date will be translated: {{ currentDate | date: 'medium' }}.
      </div>
    </div>`,
  standalone: true,
  imports: [CoreModule]
})
export class DateTranslationComponent {
  currentDate = new Date();
}
