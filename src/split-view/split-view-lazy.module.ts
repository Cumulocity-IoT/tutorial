import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'resizable',
    loadComponent: () =>
      import('./resizable-example/split-view-resizable-example.component').then(
        (m) => m.SplitViewResizableExampleComponent,
      ),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./resizable-example/split-view-alarm-details-example.component').then(
            (m) => m.SplitViewAlarmDetailsExampleComponent,
          ),
      },
    ],
  },
  {
    path: 'fixed',
    loadComponent: () =>
      import('./fixed-example/split-view-fixed-example.component').then(
        (m) => m.SplitViewFixedExampleComponent,
      ),
  },
  {
    path: 'full-width',
    loadComponent: () =>
      import('./full-width-example/split-view-full-width-example.component').then(
        (m) => m.SplitViewFullWidthExampleComponent,
      ),
  },
  {
    path: 'selection',
    loadComponent: () =>
      import('./selection-example/split-view-selection-example.component').then(
        (m) => m.SplitViewSelectionExampleComponent,
      ),
  },
  {
    path: 'details-layout',
    loadComponent: () =>
      import('./details-layout-example/split-view-details-layout-example.component').then(
        (m) => m.SplitViewDetailsLayoutExampleComponent,
      ),
  },
  {
    path: 'empty-state',
    loadComponent: () =>
      import('./empty-state-example/split-view-empty-state-example.component').then(
        (m) => m.SplitViewEmptyStateExampleComponent,
      ),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./resizable-example/split-view-alarm-details-example.component').then(
            (m) => m.SplitViewAlarmDetailsExampleComponent,
          ),
      },
    ],
  },
  {
    path: 'standalone-list',
    loadComponent: () =>
      import('./standalone-list-example/split-view-standalone-list-example.component').then(
        (m) => m.SplitViewStandaloneListExampleComponent,
      ),
  },
  {
    path: 'narrow-container',
    loadComponent: () =>
      import('./narrow-container-example/split-view-narrow-container-example.component').then(
        (m) => m.SplitViewNarrowContainerExampleComponent,
      ),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./resizable-example/split-view-alarm-details-example.component').then(
            (m) => m.SplitViewAlarmDetailsExampleComponent,
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'resizable',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SplitViewLazyModule {}
