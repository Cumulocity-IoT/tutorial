import {
  DynamicComponentErrorStrategy,
  DynamicManagedObjectResolver,
  DynamicWidgetDefinition,
  hookWidget
} from '@c8y/ngx-components';
import { DynamicEventResolver } from './event.resolver';
import { SimpleDynamicEventResolver } from './alternative-event.resolver';
import { PropertiesLibraryResolver } from './event-property.resolver';

export function provideWidgetsResolverSample() {
  return [
    hookWidget({
      loadComponent: () =>
        import('./widget-resolvers.component').then(m => m.WidgetResolversComponent),
      loadConfigComponent: () =>
        import('./widget-resolvers-config/widget-resolvers-config.component').then(
          m => m.WidgetResolversConfigComponent
        ),
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
        schema: () => import('c8y-schema-loader?interfaceName=WidgetConfig!./widget-config.model'),
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
      }
    } satisfies DynamicWidgetDefinition)
  ];
}
