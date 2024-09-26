import { NgModule } from '@angular/core';
import { hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'for-of',
      loadComponent: () => import('./for-of-example.component').then(m => m.ForOfExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'For of directive example',
        path: 'for-of'
      })
    )
  ]
})
export class ForOfModule {}
