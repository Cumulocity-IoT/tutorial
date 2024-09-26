import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
@Component({
  selector: 'new-translate',
  templateUrl: './new-translation.component.html',
  standalone: true,
  imports: [CoreModule]
})
export class NewTranslationComponent {}
