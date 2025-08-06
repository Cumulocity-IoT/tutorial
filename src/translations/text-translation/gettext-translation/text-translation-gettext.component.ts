import { Component } from '@angular/core';
import { CoreModule, gettext } from '@c8y/ngx-components';

@Component({
  selector: 'text-translation-gettext',
  template: `<c8y-title>Text translation by gettext</c8y-title>
    <div class="card">
      <div class="card-header separator">
        <h4 class="card-title">Gettext example (mark string for translation)</h4>
      </div>
      <div class="card-block">
        <p class="m-b-8">
          This word will be translated: {{ (enabled ? enabledLabel : disabledLabel) | translate }}.
        </p>
        <label class="c8y-switch">
          <input type="checkbox" [(ngModel)]="enabled" />
          <span></span>
          Toggle state
        </label>
      </div>
    </div>`,
  standalone: true,
  imports: [CoreModule]
})
export class TextTranslationGettextComponent {
  enabled = true;
  enabledLabel = gettext('Enabled');
  disabledLabel = gettext('Disabled');
}
