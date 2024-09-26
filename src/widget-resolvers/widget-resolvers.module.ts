import { NgModule } from '@angular/core';
import { WidgetResolversComponent } from './widget-resolvers.component';
import {
  CommonModule,
  DynamicComponentDefinition,
  DynamicComponentErrorStrategy,
  DynamicManagedObjectResolver,
  FormsModule,
  hookComponent
} from '@c8y/ngx-components';
import { WidgetResolversConfigComponent } from './widget-resolvers-config/widget-resolvers-config.component';
import { DynamicEventResolver } from './event.resolver';
import { SimpleDynamicEventResolver } from './alternative-event.resolver';
import { PropertiesLibraryResolver } from './event-property.resolver';
import { ContextWidgetConfig } from '@c8y/ngx-components/context-dashboard';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [WidgetResolversComponent, WidgetResolversConfigComponent],
  providers: [
    hookComponent({
      component: WidgetResolversComponent,
      configComponent: WidgetResolversConfigComponent,
      id: 'widget-resolvers',
      label: 'Demo Resolver Widget',
      description: 'Widget demonstrating resolvers.',
      resolve: {
        source: DynamicManagedObjectResolver,
        event: DynamicEventResolver || SimpleDynamicEventResolver,
        property: PropertiesLibraryResolver
      },
      errorStrategy: DynamicComponentErrorStrategy.OVERLAY_ERROR,
      data: {
        settings: {
          noNewWidgets: false,
          widgetDefaults: {
            _width: 2,
            _height: 2
          },
          ng1: {
            options: {
              noDeviceTarget: true,
              groupsSelectable: false
            }
          }
        }
      } as ContextWidgetConfig
    } satisfies DynamicComponentDefinition)
  ]
})
export class WidgetResolversModule {}
