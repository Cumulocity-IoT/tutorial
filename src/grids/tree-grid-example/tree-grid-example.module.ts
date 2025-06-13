import { NgModule } from '@angular/core';
import {
  CommonModule,
  hookNavigator,
  hookRoute,
  hookTab,
  NavigatorNode
} from '@c8y/ngx-components';
import { TreeGridTabFactory } from './tree-grid-example-tab.factory';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'grids/tree-grid-example/server',
      loadComponent: () =>
        import('./server-tree-grid-example.component').then(m => m.ServerTreeGridExampleComponent)
    }),
    hookRoute({
      path: 'grids/tree-grid-example/client',
      loadComponent: () =>
        import('./client-tree-grid-example.component').then(m => m.ClientGridExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 20,
        path: 'grids/tree-grid-example/server',
        icon: 'tree-structure',
        label: 'Tree grid',
        parent: 'Data grid examples'
      })
    ),
    hookTab(TreeGridTabFactory)
  ]
})
export class TreeGridExampleModule {}
