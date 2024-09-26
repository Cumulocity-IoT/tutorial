import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  // no declaration of StandaloneComponentComponent here.
  providers: [
    hookRoute({
      path: 'standalone-demo',
      loadComponent: () =>
        import('./standalone-component/standalone-component.component').then(
          m => m.StandaloneComponentComponent
        )
    }),
    hookNavigator({
      path: 'standalone-demo',
      icon: 'single-page-mode',
      label: 'NG Standalone Component'
    })
  ]
})
export class StandaloneDemoModule {}
