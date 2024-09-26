import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'modal/ngx-modal-selectors',
      loadComponent: () =>
        import('./ngx-modal-selectors-example.component').then(
          m => m.NgxModalSelectorsExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Ngx modal selectors',
        path: '/modal/ngx-modal-selectors',
        icon: 'list-alt',
        priority: 10,
        parent: 'Modal'
      })
    )
  ]
})
export class NgxModalSelectorsExampleModule {}
