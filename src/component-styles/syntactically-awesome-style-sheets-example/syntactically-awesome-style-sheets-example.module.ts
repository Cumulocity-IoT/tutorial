import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'component-styles/sass',
      loadComponent: () =>
        import('./syntactically-awesome-style-sheets-example.component').then(
          m => m.SyntacticallyAwesomeStyleSheetsExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/component-styles/sass',
        label: 'SASS',
        icon: 'c8y-css',
        priority: 79,
        parent: 'Component styles'
      })
    )
  ]
})
export class SyntacticallyAwesomeStyleSheetsExampleModule {}
