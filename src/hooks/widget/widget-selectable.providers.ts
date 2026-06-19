import { DynamicWidgetDefinition, hookWidget } from '@c8y/ngx-components';
import { WidgetDemo } from '../../widget/demo-widget.component';

const selectableWidgetForDevicesDefinition: DynamicWidgetDefinition = {
  id: 'selectableWidgetForDevices',
  label: 'Device-only widget',
  description: 'Shown on device dashboards and hidden on group dashboards.',
  component: WidgetDemo,
  data: {
    settings: {
      isWidgetSelectable: ({ assetMo }) => !!assetMo?.c8y_IsDevice
    }
  }
};

export function provideSelectableWidgetForDevices() {
  return [hookWidget(selectableWidgetForDevicesDefinition)];
}
