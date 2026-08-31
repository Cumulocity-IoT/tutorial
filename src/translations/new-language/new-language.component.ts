import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'new-language',
  templateUrl: './new-language.component.html',
  standalone: true,
  imports: [CoreModule],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class NewLanguageComponent {
  lang = {
    languages: {
      it: {
        name: 'Italian',
        nativeName: 'Italian',
      },
    },
  };
}
