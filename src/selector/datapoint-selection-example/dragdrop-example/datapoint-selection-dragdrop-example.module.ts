import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/datapoint-selection-example/dragdrop-example',
      loadComponent: () =>
        import('./datapoint-selection-dragdrop-example.component').then(
          m => m.DatapointSelectionDragdropExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'drag and drop',
        path: '/selector/datapoint-selection-example/dragdrop-example',
        icon: 'th-list',
        priority: -1,
        parent: 'Datapoint selection'
      })
    )
  ]
})
export class DatapointSelectionDragdropExampleModule {}
