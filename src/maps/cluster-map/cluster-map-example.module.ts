import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'maps/cluster',
      loadComponent: () =>
        import('./cluster-map-example.component').then(m => m.ClusterMapExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 10,
        path: 'maps/cluster',
        icon: 'address',
        label: 'Cluster map',
        parent: 'Map examples'
      })
    )
  ]
})
export class ClusterMapExampleModule {}
