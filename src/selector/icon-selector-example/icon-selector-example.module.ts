import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'icon-selector',
      loadComponent: () =>
        import('./icon-selector-example.component').then((m) => m.IconSelectorExampleComponent),
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/icon-selector',
        label: 'Icon selector',
        icon: 'c8y-circle-star',
        priority: 85,
      }),
    ),
  ],
})
export class NgxIconSelectorExampleModule {}
