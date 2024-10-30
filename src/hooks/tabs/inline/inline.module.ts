import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InlineTwo } from './inline-two.component';
import { InlineOne } from './inline-one.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inline1',
    pathMatch: 'full'
  },
  {
    path: 'inline1',
    component: InlineOne
  },
  {
    path: 'inline2',
    component: InlineTwo
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class InlineModule {}
