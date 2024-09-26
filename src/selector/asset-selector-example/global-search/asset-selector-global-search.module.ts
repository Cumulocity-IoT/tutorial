import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/global-search',
      loadComponent: () =>
        import('./asset-selector-global-search.component').then(
          m => m.AssetSelectorGlobalSearchComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'global search',
        path: '/selector/asset-selector-example/global-search',
        icon: 'th-list',
        priority: -1,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSelectorGlobalSearchModule {}
