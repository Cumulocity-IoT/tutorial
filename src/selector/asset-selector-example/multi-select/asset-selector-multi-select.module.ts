import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/multi-select',
      loadComponent: () =>
        import('./asset-selector-multi-select.component').then(
          m => m.AssetSelectorMultiSelectComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'multi select',
        path: '/selector/asset-selector-example/multi-select',
        icon: 'th-list',
        priority: -1,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSelectorMultiSelectModule {}
