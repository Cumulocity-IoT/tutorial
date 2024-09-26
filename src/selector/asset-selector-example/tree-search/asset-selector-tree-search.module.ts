import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/tree-search',
      loadComponent: () =>
        import('./asset-selector-tree-search.component').then(
          m => m.AssetSelectorTreeSearchComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Tree search',
        path: '/selector/asset-selector-example/tree-search',
        icon: 'th-list',
        priority: -1,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSelectorTreeSearchModule {}
