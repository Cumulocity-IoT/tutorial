import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'pagination',
      loadComponent: () =>
        import('./pagination-example.component').then(m => m.PaginationExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/pagination',
        label: 'Pagination',
        icon: 'realtime',
        priority: 20
      })
    )
  ]
})
export class PaginationExampleModule {}
