import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'help',
      loadComponent: () =>
        import('./countdown-example.component').then(m => m.CountdownExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/countdown',
        label: 'Countdown',
        icon: 'hand-o-right',
        priority: 110
      })
    )
  ]
})
export class CountdownExampleModule {}
