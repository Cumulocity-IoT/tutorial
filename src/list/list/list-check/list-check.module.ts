import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'lists/list-check',
      loadComponent: () => import('./list-check.component').then(m => m.ListCheckComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Basic list with checkboxes',
        path: 'lists/list-check',
        parent: 'Lists'
      })
    )
  ]
})
export class ListCheckModule {}
