import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'lists/list-virtual-scroll-timeline',
      loadComponent: () =>
        import('./list-virtual-scroll-timeline.component').then(
          m => m.ListVirtualScrollTimelineComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Virtual scroll with filter',
        path: 'lists/list-virtual-scroll-timeline',
        parent: 'Lists'
      })
    )
  ]
})
export class ListVirtualScrollTimelineModule {}
