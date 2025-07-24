import { NgModule } from '@angular/core';
import {
  CommonModule,
  hookNavigator,
  hookQueryParamBottomDrawer,
  hookRoute,
  NavigatorNode
} from '@c8y/ngx-components';
import { ExampleComponent } from './example-component';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'hooks/query-param-bottom-drawer',
      loadComponent: () => import('./example-button.component').then(m => m.ExampleButtonComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 70,
        path: 'hooks/query-param-bottom-drawer',
        icon: 'filter',
        label: 'QueyParamBottomDrawer',
        parent: 'Hooks'
      })
    ),
    hookQueryParamBottomDrawer({
      queryParam: 'showExampleComponent',
      closeOnNavigation: false,
      disableClickOutside: true,
      component: ExampleComponent
    })
  ]
})
export class QueryParamBottomDrawerModule {}
