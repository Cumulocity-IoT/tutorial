import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'maps/cluster-root-node',
      loadComponent: () =>
        import('./cluster-map-root-node-example.component').then(
          m => m.ClusterMapRootNodeExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 10,
        path: 'maps/cluster-root-node',
        icon: 'c8y-find-map',
        label: 'Cluster map with different root node',
        parent: 'Map examples'
      })
    )
  ]
})
export class ClusterMapRootNodeExampleModule {}
