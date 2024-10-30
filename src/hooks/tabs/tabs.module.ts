import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute, hookTab } from '@c8y/ngx-components';
import { ExampleTabFactory } from './tab';

export const hooks = [
  // important
  hookTab(ExampleTabFactory),
  // /important
  hookRoute([
    {
      path: 'hooks/tabs',
      redirectTo: 'hooks/tabs/outstanding'
    },
    {
      path: 'hooks/tabs/outstanding',
      loadComponent: () =>
        import('./outstanding/outstanding.component').then(m => m.OutstandingComponent),
      loadChildren: () => import('./inline/inline.module').then(m => m.InlineModule)
    },
    {
      path: 'hooks/tabs/awesome',
      loadComponent: () => import('./awesome/awesome.component').then(m => m.AwesomeComponent)
    }
  ]),
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
