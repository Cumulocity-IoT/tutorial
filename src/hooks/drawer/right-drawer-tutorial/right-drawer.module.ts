import { NgModule } from '@angular/core';
import { RightDrawerTutorialComponent } from './right-drawer-tutorial.component';
import { hookDrawer } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookDrawer([{ component: RightDrawerTutorialComponent, position: 'right', priority: 20 }])
  ]
})
export class RightDrawerModule {}
