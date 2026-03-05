import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'chart-example',
      loadComponent: () => import('./charts-example.component').then(m => m.ChartsExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/chart-example',
        label: 'Chart Example',
        icon: 'combo-chart',
        priority: 115
      })
    )
  ]
})
export class ChartsExampleModule {}
