import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'text-translation-ngnonbindable',
  template: `<div class="card">
    <div class="card-block">
      This sentence will be translated:
      <span class="m-r-4" ngNonBindable translate [translateParams]="ngNonBindableTranslate">
        {{ filteredItemsCount }} of {{ allItemsCount }} items.
      </span>
    </div>
  </div> `,
  standalone: true,
  imports: [CoreModule]
})
export class TextTranslationNgnonbindableComponent {
  ngNonBindableTranslate = {
    filteredItemsCount: 1,
    allItemsCount: 8
  };
}
