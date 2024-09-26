import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/datapoint-selection-example/list-example',
      loadComponent: () =>
        import('./datapoint-selection-list-example.component').then(
          m => m.DatapointSelectionListExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'list',
        path: '/selector/datapoint-selection-example/list-example',
        icon: 'th-list',
        priority: -1,
        parent: 'Datapoint selection'
      })
    )
  ]
})
export class DatapointSelectionListExampleModule {}
