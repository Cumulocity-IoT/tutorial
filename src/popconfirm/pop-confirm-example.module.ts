import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'popconfirm',
      loadComponent: () =>
        import('./pop-confirm-example.component').then(m => m.PopConfirmExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/popconfirm',
        label: 'Pop confirm',
        icon: 'hand-o-right',
        priority: 80
      })
    )
  ]
})
export class PopConfirmExampleModule {}
