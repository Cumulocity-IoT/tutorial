import { DynamicComponentErrorStrategy, hookWidget } from '@c8y/ngx-components';
import { WidgetDemo } from './demo-widget.component';
import { WidgetConfigDemo } from './demo-widget-config.component';

export function provideDemoWidget() {
  return [
    hookWidget({
      id: 'angular.widget.demo',
      label: 'Demo Widget',
      description: 'A simple demo widget showing text and device context',
      component: WidgetDemo,
      configComponent: WidgetConfigDemo,
      errorStrategy: DynamicComponentErrorStrategy.OVERLAY_ERROR,
      data: {
        schema: () => import('c8y-schema-loader?interfaceName=WidgetConfig!./widget-config.model'),
        settings: {
          noNewWidgets: false
        }
      }
    })
  ];
}
