import { NgModule } from '@angular/core';
import { hookNavigator, NavigatorNode } from '@c8y/ngx-components';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    hookNavigator(
      new NavigatorNode({
        label: 'Data grid examples',
        icon: 'table',
        priority: 30
      })
    )
  ]
})
export class GridsModule {}
