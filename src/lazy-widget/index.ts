import { hookWidget } from '@c8y/ngx-components';

async function loadViewComponent() {
  const { LazyWidgetViewComponent } = await import('./lazy-widget-view');
  return LazyWidgetViewComponent;
}

async function loadConfigComponent() {
  const { LazyWidgetConfigComponent } = await import('./lazy-widget-config');
  return LazyWidgetConfigComponent;
}

export function provideLazyWidget() {
  return [
    hookWidget({
      id: 'tutorial-lazy-widget',
      label: 'Lazy Loaded Widget',
      description: 'Lazy Loaded Widget',
      loadComponent: loadViewComponent,
      loadConfigComponent: loadConfigComponent,
      data: {
        schema: () => import('c8y-schema-loader?interfaceName=WidgetConfig!./widget-config.model')
      }
    })
  ];
}
