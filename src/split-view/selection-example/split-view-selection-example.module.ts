import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'split-view-selection',
      loadComponent: () =>
        import('./split-view-selection-example.component').then(
          (m) => m.SplitViewSelectionExampleComponent,
        ),
    }),
  ],
})
export class SplitViewSelectionExampleModule {}
