import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'modal/ngx-modal-accessibility',
      loadComponent: () =>
        import('./ngx-modal-accessibility-example.component').then(
          m => m.NgxModalAccessibilityExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Ngx modal accessibility',
        path: '/modal/ngx-modal-accessibility',
        icon: 'list-alt',
        priority: 10,
        parent: 'Modal'
      })
    )
  ]
})
export class NgxModalAccessibilityExampleModule {}
