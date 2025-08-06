import { Injectable } from '@angular/core';
import { ExtensionFactory, hookPatternMessages, PatternMessages } from '@c8y/ngx-components';

@Injectable()
export class MyPatternMessagesFactory implements ExtensionFactory<PatternMessages> {
  get() {
    return {
      '^Firmware update for (.+) completed$': {
        gettext: 'Firmware update finished for device: {{deviceName}}',
        placeholders: {
          deviceName: '$1'
        }
      }
    };
  }
}

hookPatternMessages(MyPatternMessagesFactory);
