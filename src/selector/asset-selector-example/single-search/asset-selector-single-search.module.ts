import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/single-search',
      loadComponent: () =>
        import('./asset-selector-single-search.component').then(
          m => m.AssetSelectorSingleSearchComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Single search',
        path: '/selector/asset-selector-example/single-search',
        icon: 'th-list',
        priority: -1,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSelectorSingleSearchModule {}
