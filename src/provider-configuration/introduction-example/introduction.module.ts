import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'provider-configuration/introduction-example',
      loadComponent: () => import('./introduction.component').then(m => m.IntroductionComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Introduction',
        path: '/provider-configuration/introduction-example',
        icon: 'list-alt',
        priority: 3,
        parent: 'Provider configuration'
      })
    )
  ]
})
export class IntroductionModule {}
