import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/datapoint-selection-example/context-example',
      loadComponent: () =>
        import('./datapoint-selection-context-example.component').then(
          m => m.DatapointSelectionContextExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'context',
        path: '/selector/datapoint-selection-example/context-example',
        icon: 'th-list',
        priority: -1,
        parent: 'Datapoint selection'
      })
    )
  ]
})
export class DatapointSelectionContextExampleModule {}
