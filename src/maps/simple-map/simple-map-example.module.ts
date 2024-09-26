import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'maps/simple',
      loadComponent: () =>
        import('./simple-map-example.component').then(m => m.SimpleMapExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 30,
        path: 'maps/simple',
        icon: 'marker',
        label: 'Simple map',
        parent: 'Map examples'
      })
    )
  ]
})
export class SimpleMapExampleModule {}
