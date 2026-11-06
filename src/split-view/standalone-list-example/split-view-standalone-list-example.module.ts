import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'split-view-standalone-list',
      loadComponent: () =>
        import('./split-view-standalone-list-example.component').then(
          (m) => m.SplitViewStandaloneListExampleComponent,
        ),
    }),
  ],
})
export class SplitViewStandaloneListExampleModule {}
