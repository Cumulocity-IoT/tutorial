import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'grids/expandable-rows-grid-example',
      loadComponent: () =>
        import('./expandable-rows-grid-example.component').then(m => m.ExpandableRowsGridComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 5,
        path: 'grids/expandable-rows-grid-example',
        icon: 'table',
        label: 'Expandable rows grid',
        parent: 'Data grid examples'
      })
    )
  ]
})
export class ExpandableRowsGridExampleModule {}
