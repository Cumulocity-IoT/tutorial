import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'lists/list-virtual-scroll-check',
      loadComponent: () =>
        import('./list-virtual-scroll-check.component').then(m => m.ListVirtualScrollCheckComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Virtual scroll with checkboxes',
        path: 'lists/list-virtual-scroll-check',
        parent: 'Lists'
      })
    )
  ]
})
export class ListVirtualScrollCheckModule {}
