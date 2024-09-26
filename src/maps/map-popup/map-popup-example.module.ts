import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'maps/popup',
      loadComponent: () =>
        import('./map-popup-example.component').then(m => m.MapPopupExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 20,
        path: 'maps/popup',
        icon: 'map-marker',
        label: 'Map with popup',
        parent: 'Map examples'
      })
    )
  ]
})
export class MapPopupExampleModule {}
