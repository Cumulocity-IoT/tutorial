import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'selector/datapoints-export-selector-example',
      loadComponent: () =>
        import('./datapoints-export-selector.component').then(
          m => m.DatapointsExportSelectorExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Data points export selector example',
        path: '/selector/datapoints-export-selector-example',
        icon: 'th-list',
        priority: 15
      })
    )
  ]
})
export class DatapointsExportSelectorExampleModule {}
