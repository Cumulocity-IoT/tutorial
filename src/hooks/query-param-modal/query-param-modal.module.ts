import { NgModule } from '@angular/core';
import {
  CommonModule,
  hookNavigator,
  hookQueryParamModal,
  hookRoute,
  NavigatorNode
} from '@c8y/ngx-components';
import { ExampleComponent } from './example-component';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'hooks/query-param-modal',
      loadComponent: () => import('./example-button.component').then(m => m.ExampleButtonComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 70,
        path: 'hooks/query-param-modal',
        icon: 'navigation-toolbar-top',
        label: 'QueryParamModal',
        parent: 'Hooks'
      })
    ),
    hookQueryParamModal({
      queryParam: 'showExampleModalComponent',
      component: ExampleComponent,
      modalConfig: {
        class: 'modal-lg',
        ignoreBackdropClick: true,
        keyboard: false
      }
    })
  ]
})
export class QueryParamModalModule {}
