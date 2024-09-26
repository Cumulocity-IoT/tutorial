import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'dynamic-forms/introduction',
      loadComponent: () =>
        import('./introduction-example.component').then(m => m.IntroductionExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/dynamic-forms/introduction',
        label: 'Introduction',
        icon: 'hand-o-right',
        priority: 80,
        parent: 'Dynamic forms'
      })
    )
  ]
})
export class IntroductionExampleModule {}
