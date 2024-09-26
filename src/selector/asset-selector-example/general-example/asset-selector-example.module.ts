import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/general-example',
      loadComponent: () =>
        import('./asset-selector-example.component').then(m => m.AssetSelectorExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Asset selector',
        path: '/selector/asset-selector-example/general-example',
        icon: 'list-alt',
        priority: 2,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSelectorExampleModule {}
