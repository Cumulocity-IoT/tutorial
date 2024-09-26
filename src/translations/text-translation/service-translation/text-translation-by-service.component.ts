import { Component } from '@angular/core';
import { CoreModule, gettext } from '@c8y/ngx-components';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'text-translation-by-service',
  template: `
    <c8y-title>Text translation by service</c8y-title>
    <div class="card">
      <div class="card-block">
        <div class="card-block">This word will be translated: {{ translateInstant }}.</div>
        <div class="card-block">
          This sentence will be translated too: {{ deleteDeviceProfile() }}
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CoreModule]
})
export class TextTranslationByServiceComponent {
  translateInstant = '';

  constructor(private translateService: TranslateService) {
    // instant might fail, as it is sync and the language might not be loaded:
    this.translateInstant = this.translateService.instant(gettext('Device'));
    // alternative you can use the async get:
    // this.translateService.get(gettext('Device'));
  }

  deleteDeviceProfile() {
    const deviceProfileName = 'Johny';
    return this.translateService.instant(
      gettext('You are about to delete a device profile "{{ deviceProfileName }}".'),
      { deviceProfileName }
    );
  }
}
