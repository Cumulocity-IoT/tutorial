import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'text-translation-ngnonbindable',
  template: `
    <div class="card">
      <div class="card-block">
        Translatable text with dynamic placeholders:
        <span class="m-r-4" ngNonBindable translate [translateParams]="ngNonBindableTranslate">
          {{ filteredItemsCount }} of {{ allItemsCount }} items.
        </span>
      </div>
    </div>
    <div class="card">
      <div class="card-block">
        Translatable text with a dynamic link:
        <span
          class="m-r-4"
          ngNonBindable
          translate
          [translateParams]="ngNonBindableWithLinkTranslate"
        >
          For more information, see the
          <a href="{{ docsUrl }}" target="_blank">concepts</a> documentation.
        </span>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CoreModule]
})
export class TextTranslationNgnonbindableComponent {
  ngNonBindableTranslate = {
    filteredItemsCount: 1,
    allItemsCount: 8
  };

  ngNonBindableWithLinkTranslate = {
    docsUrl: '/docs/concepts/concepts-introduction'
  };
}
