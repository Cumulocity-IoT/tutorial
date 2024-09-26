import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/datapoint-selection-example/validation-example',
      loadComponent: () =>
        import('./datapoint-selection-validation-example.component').then(
          m => m.DatapointSelectionValidationExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'validation error',
        path: '/selector/datapoint-selection-example/validation-example',
        icon: 'th-list',
        priority: -1,
        parent: 'Datapoint selection'
      })
    )
  ]
})
export class DatapointSelectionValidationExampleModule {}
