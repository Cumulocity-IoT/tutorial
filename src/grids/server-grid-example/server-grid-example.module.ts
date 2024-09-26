import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';
import { ServerGridActionControlsModule } from './server-grid-action-controls.module';

@NgModule({
  imports: [CommonModule, ServerGridActionControlsModule],
  providers: [
    hookRoute({
      path: 'grids/server-grid-example',
      loadComponent: () =>
        import('./server-grid-example.component').then(m => m.ServerGridExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 20,
        path: 'grids/server-grid-example',
        icon: 'table',
        label: 'Server grid',
        parent: 'Data grid examples'
      })
    )
  ]
})
export class ServerGridExampleModule {}
