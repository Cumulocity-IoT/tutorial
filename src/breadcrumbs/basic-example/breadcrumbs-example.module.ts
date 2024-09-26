import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'breadcrumbs-basic',
      loadComponent: () =>
        import('./breadcrumbs-example.component').then(m => m.BreadcrumbsExampleComponents)
    }),
    hookNavigator(
      new NavigatorNode({
        path: 'breadcrumbs-basic',
        icon: 'notification',
        label: 'Breadcrumbs basic',
        parent: 'Breadcrumbs'
      })
    )
  ]
})
export class BreadcrumbsExampleModule {}
