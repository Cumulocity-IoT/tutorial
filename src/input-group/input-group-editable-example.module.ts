import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'input-group-editable',
      loadComponent: () =>
        import('./input-group-editable-example.component').then(
          m => m.InputGroupEditableExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/input-group-editable',
        label: 'Inline editable input',
        icon: 'hand-o-right',
        priority: 5
      })
    )
  ]
})
export class InputGroupEditableExampleModule {}
