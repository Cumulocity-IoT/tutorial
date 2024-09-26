import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/datapoint-selection-example/modal-example',
      loadComponent: () =>
        import('./datapoint-selection-modal-example.component').then(
          m => m.DatapointSelectionModalExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'modal',
        path: '/selector/datapoint-selection-example/modal-example',
        icon: 'th-list',
        priority: -1,
        parent: 'Datapoint selection'
      })
    )
  ]
})
export class DatapointSelectionModalExampleModule {}
