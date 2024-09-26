import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute, hookTab } from '@c8y/ngx-components';
import { ExampleTabFactory } from './tab';

export const hooks = [
  hookTab(ExampleTabFactory),
  hookRoute({
    path: 'hooks/tabs',
    redirectTo: 'hooks/tabs/outstanding'
  }),
  hookRoute({
    path: 'hooks/tabs/outstanding',
    loadComponent: () =>
      import('./outstanding/outstanding.component').then(m => m.OutstandingComponent)
  }),
  hookRoute({
    path: 'hooks/tabs/awesome',
    loadComponent: () => import('./awesome/awesome.component').then(m => m.AwesomeComponent)
  }),
  hookNavigator(
    new NavigatorNode({
      priority: 50,
      path: 'hooks/tabs',
      icon: 'plane',
      label: 'Tabs',
      parent: 'Hooks'
    })
  )
];
@NgModule({
  declarations: [],
  /**
   * Adding the hooks to the providers:
   */
  providers: [...hooks]
})
export class TabsModule {}
