import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/datapoint-selection-example/single-select-example',
      loadComponent: () =>
        import('./datapoint-selection-single-select-example.component').then(
          m => m.DatapointSelectionSingleSelectExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'single-select',
        path: '/selector/datapoint-selection-example/single-select-example',
        icon: 'th-list',
        priority: -1,
        parent: 'Datapoint selection'
      })
    )
  ]
})
export class DatapointSelectionSingleSelectExampleModule {}
