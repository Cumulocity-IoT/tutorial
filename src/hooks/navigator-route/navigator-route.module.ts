import { NgModule } from '@angular/core';
import { NavigatorNode, NavigatorNodeData, hookNavigator, hookRoute } from '@c8y/ngx-components';

export const hooks = [
  hookRoute({
    path: 'hooks/navigator-route',
    loadComponent: () => import('./basic-view/basic-view.component').then(m => m.BasicViewComponent)
  }),
  hookNavigator(
    new NavigatorNode({
      priority: 60,
      path: 'hooks/navigator-route',
      icon: 'navigation',
      label: 'Navigator-route',
      parent: 'Hooks'
    } as NavigatorNodeData)
  )
];

@NgModule({
  imports: [],
  /**
   * Adding the hooks to the providers:
   */
  providers: [...hooks]
})
export class NavigatorRouteModule {}
