import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'app-icon',
      loadComponent: () =>
        import('./app-icon-example.component').then(m => m.AppIconExampleComponents)
    }),
    hookNavigator(
      new NavigatorNode({
        path: 'app-icon',
        icon: 'notification',
        label: 'App icon'
      })
    )
  ]
})
export class AppIconExampleModule {}
