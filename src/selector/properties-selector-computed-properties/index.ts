import { hookComputedProperty } from '@c8y/ngx-components/asset-properties';
import { alarmCountLastWeek } from './alarm-count-last-week-computed-property';

export const computedAssetPropertiesProvidersExample = [hookComputedProperty([alarmCountLastWeek])];
