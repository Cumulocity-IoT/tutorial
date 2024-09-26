import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/datapoint-selection-example/selector',
      loadComponent: () =>
        import('./datapoint-selection-selector-example.component').then(
          m => m.DatapointSelectionSelectorExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'selector',
        path: '/selector/datapoint-selection-example/selector',
        icon: 'th-list',
        priority: -1,
        parent: 'Datapoint selection'
      })
    )
  ]
})
export class DatapointSelectionSelectorExampleModule {}
