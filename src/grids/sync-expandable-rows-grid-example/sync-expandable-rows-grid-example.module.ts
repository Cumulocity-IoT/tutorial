import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'grids/sync-expandable-rows-grid-example',
      loadComponent: () =>
        import('./sync-expandable-rows-grid-example.component').then(
          m => m.SyncExpandableRowsGridComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 5,
        path: 'grids/sync-expandable-rows-grid-example',
        icon: 'table',
        label: 'Synchronous expandable rows grid',
        parent: 'Data grid examples'
      })
    )
  ]
})
export class SyncExpandableRowsGridExampleModule {}
