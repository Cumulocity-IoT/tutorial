import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'breadcrumbs-content-projection',
      loadComponent: () =>
        import('./breadcrumbs-content-projection-example.component').then(
          m => m.BreadcrumbsContentProjectionExampleComponents
        )
    }),
    hookNavigator(
      new NavigatorNode({
        path: 'breadcrumbs-content-projection',
        icon: 'notification',
        label: 'Breadcrumbs content projection',
        parent: 'Breadcrumbs'
      })
    )
  ]
})
export class BreadcrumbsContentProjectionExampleModule {}
