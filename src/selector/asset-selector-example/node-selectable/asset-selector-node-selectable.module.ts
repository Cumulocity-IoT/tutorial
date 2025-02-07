import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [BsDropdownModule.forRoot()],
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/node-selectable',
      loadComponent: () =>
        import('./asset-selector-node-selectable.component').then(
          m => m.AssetSelectorNodeSelectableExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'node selectable',
        path: '/selector/asset-selector-example/node-selectable',
        icon: 'th-list',
        priority: -1,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSelectorNodeSelectableExampleModule {}
