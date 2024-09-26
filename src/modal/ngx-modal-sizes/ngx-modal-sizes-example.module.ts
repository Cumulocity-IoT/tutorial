import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'modal/ngx-modal-sizes',
      loadComponent: () =>
        import('./ngx-modal-sizes-example.component').then(m => m.NgxModalSizesExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Ngx modal sizes',
        path: '/modal/ngx-modal-sizes',
        icon: 'list-alt',
        priority: 20,
        parent: 'Modal'
      })
    )
  ]
})
export class NgxModalSizesExampleModule {}
