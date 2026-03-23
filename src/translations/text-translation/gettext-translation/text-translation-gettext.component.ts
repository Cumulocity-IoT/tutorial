import { Component } from '@angular/core';
import { gettext } from '@c8y/ngx-components/gettext';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'text-translation-gettext',
  template: `<c8y-title>Text translation by gettext</c8y-title>
    <div class="d-flex a-i-center m-b-16">
      <label class="c8y-switch m-r-8">
        <input type="checkbox" [(ngModel)]="enabled" />
        <span></span>
      </label>
      Toggle state
    </div>
    <div class="card">
      <div class="card-header separator">
        <h4 class="card-title">Use labels annotated for translation in the component class</h4>
      </div>
      <div class="card-block">
        <p>
          This word will be translated: {{ (enabled ? enabledLabel : disabledLabel) | translate }}.
        </p>
      </div>
    </div>
    <div class="card">
      <div class="card-header separator">
        <h4 class="card-title">Use labels translated in template variables</h4>
      </div>
      <div class="card-block">
        @let activeLabel = 'Active' | translate;
        @let inactiveLabel = 'Inactive' | translate;
        <p>This word will be translated: {{ enabled ? activeLabel : inactiveLabel }}.</p>
      </div>
    </div>
    <div class="card">
      <div class="card-header separator">
        <h4 class="card-title">Use gettext() in a template expression</h4>
      </div>
      <div class="card-block">
        <p>
          This word will be translated:
          {{ (enabled ? gettext('Running') : gettext('Stopped')) | translate }}.
        </p>
      </div>
    </div>`,
  standalone: true,
  imports: [CoreModule]
})
export class TextTranslationGettextComponent {
  enabled = true;
  enabledLabel = gettext('Enabled');
  disabledLabel = gettext('Disabled');
  readonly gettext = gettext;
}
