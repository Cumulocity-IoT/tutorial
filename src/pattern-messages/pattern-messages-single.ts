import { hookPatternMessages } from '@c8y/ngx-components';

hookPatternMessages({
  '^Alarm: (.+) is active$': {
    gettext: 'Active alarm for {{alarmType}} detected',
    placeholders: {
      alarmType: '$1'
    }
  }
});
