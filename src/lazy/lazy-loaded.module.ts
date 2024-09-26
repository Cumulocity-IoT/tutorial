import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComponentTwo } from './component-two.component';
import { ComponentOne } from './component-one.component';

const routes: Routes = [
  {
    path: 'one',
    component: ComponentOne
  },
  {
    path: 'two',
    component: ComponentTwo
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class LazyLoadedModule {}
