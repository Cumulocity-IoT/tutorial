import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'help',
      loadComponent: () => import('./help-example.component').then(m => m.HelpExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/help',
        label: 'Help',
        icon: 'hand-o-right',
        priority: 80
      })
    )
  ]
})
export class HelpExampleModule {}
