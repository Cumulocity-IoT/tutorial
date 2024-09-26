import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'component-styles/less',
      loadComponent: () =>
        import('./leaner-style-sheets-example.component').then(
          m => m.LeanerStyleSheetsExampleComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/component-styles/less',
        label: 'LESS',
        icon: 'c8y-css',
        priority: 79,
        parent: 'Component styles'
      })
    )
  ]
})
export class LeanerStyleSheetsExampleModule {}
