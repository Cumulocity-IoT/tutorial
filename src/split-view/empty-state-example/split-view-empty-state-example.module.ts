import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'split-view-empty-state',
      loadComponent: () =>
        import('./split-view-empty-state-example.component').then(
          (m) => m.SplitViewEmptyStateExampleComponent,
        ),
      children: [
        {
          path: ':id',
          loadComponent: () =>
            import('../resizable-example/split-view-alarm-details-example.component').then(
              (m) => m.SplitViewAlarmDetailsExampleComponent,
            ),
        },
      ],
    }),
  ],
})
export class SplitViewEmptyStateExampleModule {}
