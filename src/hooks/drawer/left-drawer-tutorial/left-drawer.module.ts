import { NgModule } from '@angular/core';
import { hookDrawer } from '@c8y/ngx-components';
import { LeftDrawerTutorialComponent } from './left-drawer-tutorial.component';

@NgModule({
  providers: [
    hookDrawer([{ component: LeftDrawerTutorialComponent, position: 'left', priority: 10 }])
  ]
})
export class LeftDrawerModule {}
