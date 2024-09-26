import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [BsDropdownModule.forRoot()],
  providers: [
    hookRoute({
      path: 'selector/asset-selector-example/miller-columns-options',
      loadComponent: () =>
        import('./asset-selector-miller-example.component').then(
          m => m.AssetSelectorMillerExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Miller columns options',
        path: '/selector/asset-selector-example/miller-columns-options',
        icon: 'view-column',
        priority: 5,
        parent: 'Asset selector'
      })
    )
  ]
})
export class AssetSelectorMillerExampleModule {}
