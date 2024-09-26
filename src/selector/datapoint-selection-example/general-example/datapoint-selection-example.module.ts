import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/datapoint-selection-example/general-example',
      loadComponent: () =>
        import('./datapoint-selection-example.component').then(
          m => m.DatapointSelectionExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Datapoint selection',
        path: '/selector/datapoint-selection-example/general-example',
        icon: 'th-list',
        priority: -1,
        parent: 'Datapoint selection'
      })
    )
  ]
})
export class DatapointSelectionExampleModule {}
