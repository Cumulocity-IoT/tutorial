import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/different-root',
      loadComponent: () =>
        import('./asset-selector-different-root.component').then(
          m => m.AssetSelectorDifferentRootComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'different root',
        path: '/selector/asset-selector-example/different-root',
        icon: 'th-list',
        priority: -1,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSelectorDifferentRootModule {}
