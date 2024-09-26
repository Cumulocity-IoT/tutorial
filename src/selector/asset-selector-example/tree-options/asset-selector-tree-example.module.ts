import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [BsDropdownModule.forRoot()],
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/tree-options',
      loadComponent: () =>
        import('./asset-selector-tree-example.component').then(
          m => m.AssetSelectorTreeExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Hierarchy tree options',
        path: '/selector/asset-selector-example/tree-options',
        icon: 'tree-structure',
        priority: 10,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSelectorTreeExampleModule {}
