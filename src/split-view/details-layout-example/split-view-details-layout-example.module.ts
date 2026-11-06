import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'split-view-details-layout',
      loadComponent: () =>
        import('./split-view-details-layout-example.component').then(
          (m) => m.SplitViewDetailsLayoutExampleComponent,
        ),
    }),
  ],
})
export class SplitViewDetailsLayoutExampleModule {}
