import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'properties-list',
      loadComponent: () =>
        import('./properties-list-example.component').then(m => m.PropertiesListExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Properties list',
        path: '/properties-list',
        icon: 'th-list',
        priority: 0
      })
    )
  ]
})
export class PropertiesListExampleModule {}
