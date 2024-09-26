import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/child-devices',
      loadComponent: () =>
        import('./asset-selector-child-devices.component').then(
          m => m.AssetSelectorChildDevicesComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'child devices',
        path: '/selector/asset-selector-example/child-devices',
        icon: 'th-list',
        priority: -1,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSelectorChildDevicesModule {}
