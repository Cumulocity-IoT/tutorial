import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/only-devices',
      loadComponent: () =>
        import('./asset-selector-only-devices.component').then(
          m => m.AssetSelectorOnlyDevicesComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'only devices',
        path: '/selector/asset-selector-example/only-devices',
        icon: 'th-list',
        priority: -1,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSelectorOnlyDevicesModule {}
