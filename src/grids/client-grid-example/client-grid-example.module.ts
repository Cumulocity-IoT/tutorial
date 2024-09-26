import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'grids/client-grid-example',
      loadComponent: () =>
        import('./client-grid-example.component').then(m => m.ClientGridExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 30,
        path: 'grids/client-grid-example',
        icon: 'table',
        label: 'Client grid',
        parent: 'Data grid examples'
      })
    )
  ]
})
export class ClientGridExampleModule {}
