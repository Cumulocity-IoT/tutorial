import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'quick-link',
      loadComponent: () =>
        import('./quick-link-example.component').then(m => m.QuickLinkExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/quick-link',
        label: 'Quick link',
        icon: 'c8y-css',
        priority: 85
      })
    )
  ]
})
export class QuickLinkExampleModule {}
