import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'modal/ngx-modal',
      loadComponent: () =>
        import('./ngx-modal-example.component').then(m => m.NgxModalExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Ngx modal',
        path: '/modal/ngx-modal',
        icon: 'list-alt',
        priority: 30,
        parent: 'Modal'
      })
    )
  ]
})
export class NgxModalExampleModule {}
