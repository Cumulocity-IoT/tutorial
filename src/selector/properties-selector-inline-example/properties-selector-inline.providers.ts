import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';
import { hookComputedProperty } from '@c8y/ngx-components/asset-properties';
import { alarmCountLastWeek } from '../properties-selector-computed-properties/alarm-count-last-week-computed-property';

export const propertiesSelectorInlineExampleProviders = [
  hookRoute({
    path: 'selector/properties-selector-inline-example',
    loadComponent: () =>
      import('./properties-selector-inline.component').then(
        m => m.PropertiesSelectorInlineExampleComponent
      )
  }),
  hookNavigator(
    new NavigatorNode({
      label: 'Properties selector inline example',
      path: '/selector/properties-selector-inline-example',
      icon: 'th-list',
      priority: 4
    })
  ),
  hookComputedProperty([alarmCountLastWeek])
];
