import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'extendable-input-list',
      loadComponent: () =>
        import('./extendable-input-list-example.component').then(
          m => m.ExtendableInputListExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/extendable-input-list',
        label: 'Extendable input list',
        icon: 'hand-o-right',
        priority: 5
      })
    )
  ]
})
export class ExtendableInputListExampleModule {}
