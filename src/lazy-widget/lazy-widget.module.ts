import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { hookWidget } from '@c8y/ngx-components';

async function loadViewComponent() {
  const { LazyWidgetViewComponent } = await import('./lazy-widget-view');
  return LazyWidgetViewComponent;
}

async function loadConfigComponent() {
  const { LazyWidgetConfigComponent } = await import('./lazy-widget-config');
  return LazyWidgetConfigComponent;
}

@NgModule({
  imports: [CommonModule],
  providers: [
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
  ]
})
export class LazyWidgetModule {}
