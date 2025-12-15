import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'split-view-resizable',
      loadComponent: () =>
        import('./split-view-resizable-example.component').then(
          m => m.SplitViewResizableExampleComponent
        )
    })
  ]
})
export class SplitViewResizableExampleModule {}
