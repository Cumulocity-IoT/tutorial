import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'breadcrumbs-expand',
      loadComponent: () =>
        import('./breadcrumbs-expand-example.component').then(
          m => m.BreadcrumbsExpandExampleComponents
        )
    }),
    hookNavigator(
      new NavigatorNode({
        path: 'breadcrumbs-expand',
        icon: 'notification',
        label: 'Breadcrumbs expand',
        parent: 'Breadcrumbs'
      })
    )
  ]
})
export class BreadcrumbsExpandExampleModule {}
