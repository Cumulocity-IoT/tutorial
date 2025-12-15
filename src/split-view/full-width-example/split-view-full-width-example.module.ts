import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'split-view-full-width',
      loadComponent: () =>
        import('./split-view-full-width-example.component').then(
          m => m.SplitViewFullWidthExampleComponent
        )
    })
  ]
})
export class SplitViewFullWidthExampleModule {}
