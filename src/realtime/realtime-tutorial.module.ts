import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'realtime',
      loadComponent: () =>
        import('./realtime-tutorial.component').then(m => m.RealtimeTutorialComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Realtime',
        path: '/realtime',
        icon: 'realtime',
        priority: 10
      })
    )
  ]
})
export class RealtimeTutorialModule {}
