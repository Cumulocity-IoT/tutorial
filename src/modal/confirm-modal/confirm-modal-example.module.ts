import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'modal/confirm-modal',
      loadComponent: () =>
        import('./confirm-modal-example.component').then(m => m.ConfirmModalExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Confirm Modal',
        path: '/modal/confirm-modal',
        icon: 'list-alt',
        priority: 1,
        parent: 'Modal'
      })
    )
  ]
})
export class ConfirmModalExampleModule {}
