import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'resizable-grid-example',
      loadComponent: () =>
        import('./resizable-grid-example.component').then(m => m.ResizableGridExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/resizable-grid-example',
        label: 'Resizable grid',
        icon: 'columns',
        priority: 86
      })
    )
  ]
})
export class ResizableGridExampleModule {}
