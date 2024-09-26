import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/column-header',
      loadComponent: () =>
        import('./asset-selector-column-header.component').then(
          m => m.AssetSelectorColumnHeaderComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'column header',
        path: '/selector/asset-selector-example/column-header',
        icon: 'th-list',
        priority: -1,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSelectorColumnHeaderModule {}
