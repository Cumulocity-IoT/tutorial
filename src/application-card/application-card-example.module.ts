import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'application-card',
      loadComponent: () =>
        import('./application-card-example.component').then(m => m.ApplicationCardExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        path: 'application-card',
        icon: 'inactive-state',
        label: 'Application card'
      })
    )
  ]
})
export class ApplicationCardExampleModule {}
