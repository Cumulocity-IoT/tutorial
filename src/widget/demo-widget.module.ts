import { NgModule } from '@angular/core';
import {
  CommonModule as C8yCommonModule,
  DynamicComponentErrorStrategy,
  DynamicWidgetDefinition,
  FormsModule,
  hookWidget,
  WidgetDataType
} from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { WidgetConfigDemo } from './demo-widget-config.component';
import { WidgetDemo } from './demo-widget.component';

/**
 * This demo widget provides an example on how
 * to use the hookComponent. The component itself
 * is implemented in the dashboard on the
 * ../hello/hello.component.html by using the
 * dynamic-component tag.
 */
@NgModule({
  declarations: [WidgetDemo, WidgetConfigDemo],
  imports: [FormsModule, AssetSelectorModule, C8yCommonModule],
  exports: [],
  providers: [
    hookWidget({
      id: 'angular.widget.demo',
      label: 'My angular widget',
      description: 'This is a description from  angular',
      component: WidgetDemo,
      configComponent: WidgetConfigDemo,
      errorStrategy: DynamicComponentErrorStrategy.OVERLAY_ERROR,

      /** new Angular-Dashboard definition */
      data: {
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
      } as WidgetDataType
    } as DynamicWidgetDefinition)
  ]
})
export class DashboardWidgetDemoModule {}
