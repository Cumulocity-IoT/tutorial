import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
@Component({
  selector: 'new-translate',
  templateUrl: './new-translation.component.html',
  standalone: true,
  imports: [CoreModule],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class NewTranslationComponent {}
