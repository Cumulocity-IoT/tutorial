import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'component-styles/css',
      loadComponent: () =>
        import('./cascading-style-sheets-example.component').then(
          m => m.CascadingStyleSheetsExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/component-styles/css',
        label: 'CSS',
        icon: 'c8y-css',
        priority: 79,
        parent: 'Component styles'
      })
    )
  ]
})
export class CascadingStyleSheetsExampleModule {}
