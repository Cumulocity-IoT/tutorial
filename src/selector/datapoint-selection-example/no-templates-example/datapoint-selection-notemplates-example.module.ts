import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/datapoint-selection-example/no-templates-example',
      loadComponent: () =>
        import('./datapoint-selection-notemplates-example.component').then(
          m => m.DatapointSelectionNotemplatesExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'without templates',
        path: '/selector/datapoint-selection-example/no-templates-example',
        icon: 'th-list',
        priority: -1,
        parent: 'Datapoint selection'
      })
    )
  ]
})
export class DatapointSelectionNotemplatesExampleModule {}
