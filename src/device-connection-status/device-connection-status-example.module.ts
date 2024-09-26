import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'device-connection-status',
      loadComponent: () =>
        import('./device-connection-status-example.component').then(
          m => m.DeviceConnectionStatusExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/device-connection-status',
        label: 'Device connection status',
        icon: 'realtime',
        priority: 15
      })
    )
  ]
})
export class DeviceConnectionStatusExampleModule {}
