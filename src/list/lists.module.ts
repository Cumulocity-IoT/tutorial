import { NgModule } from '@angular/core';
import { hookNavigator, NavigatorNode } from '@c8y/ngx-components';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    hookNavigator(
      new NavigatorNode({
        label: 'Lists',
        icon: 'c8y-device',
        priority: 97
      })
    )
  ]
})
export class ListsModule {}
