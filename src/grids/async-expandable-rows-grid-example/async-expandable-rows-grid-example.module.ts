import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'grids/async-expandable-rows-grid-example',
      loadComponent: () =>
        import('./async-expandable-rows-grid-example.component').then(
          m => m.AsyncExpandableRowsGridComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 5,
        path: 'grids/async-expandable-rows-grid-example',
        icon: 'table',
        label: 'Asynchronous expandable rows grid',
        parent: 'Data grid examples'
      })
    )
  ]
})
export class AsyncExpandableRowsGridExampleModule {}
