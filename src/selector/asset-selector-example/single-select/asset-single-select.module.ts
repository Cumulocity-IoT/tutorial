import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/single-select',
      loadComponent: () =>
        import('./asset-selector-single-select.component').then(
          m => m.AssetSelectorSingleSelectComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'single select',
        path: '/selector/asset-selector-example/single-select',
        icon: 'th-list',
        priority: -1,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSingleSelectModule {}
