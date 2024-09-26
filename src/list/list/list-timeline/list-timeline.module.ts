import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'lists/list-timeline',
      loadComponent: () => import('./list-timeline.component').then(m => m.ListTimelineComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Basic list with timeline',
        path: 'lists/list-timeline',
        parent: 'Lists'
      })
    )
  ]
})
export class ListTimelineModule {}
