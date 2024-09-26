import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/tree-devices',
      loadComponent: () =>
        import('./asset-selector-tree-devices.component').then(
          m => m.AssetSelectorTreeDevicesComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Tree devices',
        path: '/selector/asset-selector-example/tree-devices',
        icon: 'th-list',
        priority: -1,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSelectorTreeDevicesModule {}
