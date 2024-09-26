import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'grids/empty-grid-example',
      loadComponent: () =>
        import('./empty-grid-example.component').then(m => m.EmptyGridExampleComponent)
    })
  ]
})
export class EmptyGridExampleModule {}
