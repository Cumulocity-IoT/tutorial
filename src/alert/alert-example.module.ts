import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'alert',
      loadComponent: () => import('./alert-example.components').then(m => m.AlertExampleComponents)
    }),
    hookNavigator(
      new NavigatorNode({
        path: 'alert',
        icon: 'notification',
        label: 'Alert'
      })
    )
  ]
})
export class AlertExampleModule {}
