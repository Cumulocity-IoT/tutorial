import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/tree-single',
      loadComponent: () =>
        import('./asset-selector-tree-single.component').then(
          m => m.AssetSelectorTreeSingleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'tree single',
        path: '/selector/asset-selector-example/tree-single',
        icon: 'th-list',
        priority: -1,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSelectorTreeSingleModule {}
