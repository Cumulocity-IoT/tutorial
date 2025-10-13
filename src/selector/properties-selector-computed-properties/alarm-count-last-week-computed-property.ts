import { inject, Injector } from '@angular/core';
import { AlarmQueryFilter, AlarmService, IManagedObject } from '@c8y/client';
import { ComputedPropertyDefinition } from '@c8y/ngx-components/asset-properties';

export type AlarmCountLastWeekConfig = {
  type: string;
};

export const alarmCountLastWeek: ComputedPropertyDefinition<
  ['device', 'group', 'asset'],
  AlarmCountLastWeekConfig
> = {
  name: 'alarmCountLastWeek',
  contextType: ['device', 'group', 'asset'],
  prop: {
    c8y_JsonSchema: {
      properties: {
        alarmCountLastWeek: {
          label: 'Alarm count last week',
          type: 'number'
        }
      }
    },
    name: 'alarmCountLastWeek',
    label: 'Alarm count last week',
    type: 'number',
    config: { type: '' } as AlarmCountLastWeekConfig,
    computed: true,
    isEditable: false,
    isStandardProperty: true
  },
  loadConfigComponent: () =>
    import('./alarm-count-config.component').then(m => m.ComputedPropertyAlarmCountConfigComponent),
  value: ({ config, context }) => alarmCountValue(config, context)
};

async function alarmCountValue(
  config: AlarmCountLastWeekConfig,
  asset: IManagedObject
): Promise<number> {
  const injector = inject(Injector);
  const alarmService = injector.get(AlarmService);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 8);

  const filters: AlarmQueryFilter = {
    source: asset.id,
    dateFrom: sevenDaysAgo.toISOString(),
    type: config.type,
    pageSize: 1,
    withTotalElements: true
  };

  const resp = await alarmService.list(filters);
  return resp?.paging?.totalElements || 0;
}
