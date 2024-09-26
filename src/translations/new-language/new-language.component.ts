import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'new-language',
  templateUrl: './new-language.component.html',
  standalone: true,
  imports: [CoreModule]
})
export class NewLanguageComponent {
  lang = {
    languages: {
      it: {
        name: 'Italian',
        nativeName: 'Italian'
      }
    }
  };
}
