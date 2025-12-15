import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconPanelExampleComponent } from './icon-panel-example.component';

const routes: Routes = [
  {
    path: '',
    component: IconPanelExampleComponent
  }
];

@NgModule({
  imports: [IconPanelExampleComponent, RouterModule.forChild(routes)],
  exports: [IconPanelExampleComponent]
})
export class IconPanelExampleModule {}
