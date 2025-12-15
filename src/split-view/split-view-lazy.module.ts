import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'resizable',
    loadComponent: () =>
      import('./resizable-example/split-view-resizable-example.component').then(
        m => m.SplitViewResizableExampleComponent
      )
  },
  {
    path: 'fixed',
    loadComponent: () =>
      import('./fixed-example/split-view-fixed-example.component').then(
        m => m.SplitViewFixedExampleComponent
      )
  },
  {
    path: 'full-width',
    loadComponent: () =>
      import('./full-width-example/split-view-full-width-example.component').then(
        m => m.SplitViewFullWidthExampleComponent
      )
  },
  {
    path: '',
    redirectTo: 'resizable',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class SplitViewLazyModule {}
