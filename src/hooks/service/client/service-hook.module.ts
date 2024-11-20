import { NgModule } from '@angular/core';
import { NavigatorNode, hookComponent, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    /* Hook the Service hook demo view */
    hookRoute({
      path: 'hooks/service',
      loadComponent: () => import('./basic-view.component').then(m => m.BasicViewComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 40,
        path: 'hooks/service',
        icon: 'gears',
        label: 'Service',
        parent: 'Hooks'
      })
    ),
    /* Hook a client component for the service provided via `hookService` */
    hookComponent({
      id: 'counter.component',
      label: 'Counter component',
      description: 'This component can count',
      loadComponent: () => import('./counter.component').then(m => m.CounterComponent)
    })
  ]
})
export class ServiceHookModule {}
