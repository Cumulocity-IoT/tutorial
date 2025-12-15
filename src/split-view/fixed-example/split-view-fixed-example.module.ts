import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'split-view-fixed',
      loadComponent: () =>
        import('./split-view-fixed-example.component').then(m => m.SplitViewFixedExampleComponent)
    })
  ]
})
export class SplitViewFixedExampleModule {}
