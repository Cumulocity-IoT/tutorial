import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'breadcrumbs-outlet',
      loadComponent: () =>
        import('./breadcrumbs-outlet-example.component').then(
          m => m.BreadcrumbsOutletExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        path: 'breadcrumbs-outlet',
        icon: 'notification',
        label: 'Breadcrumbs outlet',
        parent: 'Breadcrumbs'
      })
    )
  ]
})
export class BreadcrumbsOutletExampleModule {}
