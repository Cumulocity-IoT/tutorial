import { DynamicComponentErrorStrategy, hookWidget } from '@c8y/ngx-components';
import { WidgetDemo } from './demo-widget.component';
import { WidgetConfigDemo } from './demo-widget-config.component';

export function provideDemoWidget() {
  return [
    /**
     * This demo widget provides an example on how
     * to use the hookWidget. The component itself
     * is implemented in the dashboard on the
     * ../hello/hello.component.html by using the
     * dynamic-component tag.
     */
    hookWidget({
      id: 'angular.widget.demo',
      label: 'My angular widget',
      description: 'This is a description from  angular',
      component: WidgetDemo,
      configComponent: WidgetConfigDemo,
      errorStrategy: DynamicComponentErrorStrategy.OVERLAY_ERROR,
      /** new Angular-Dashboard definition */
      data: {
        schema: () => import('c8y-schema-loader?interfaceName=WidgetConfig!./widget-config.model'),
        // The settings object can be used to configure the configComponent
        settings: {
          noNewWidgets: false, // Set this to true, to don't allow adding new widgets.
          ng1: {
            options: {
              noDeviceTarget: false, // Set this to true to hide the AngularJS device selector.
              groupsSelectable: false // Set this, if not only devices should be selectable.
            }
          }
        },
        // Settings that are attached to the display component (in this case: WidgetDemo)
        displaySettings: {
          globalTimeContext: true // Set this to true, to add a global time context binding
        }
      }
    })
  ];
}
