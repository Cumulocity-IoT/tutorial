import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'grids/device-grid-example',
      loadComponent: () =>
        import('./device-grid-example.component').then(m => m.DeviceGridExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 10,
        path: 'grids/device-grid-example',
        icon: 'table',
        label: 'Device grid',
        parent: 'Data grid examples'
      })
    )
  ]
})
export class DeviceGridExampleModule {}
