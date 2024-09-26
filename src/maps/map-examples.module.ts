import { NgModule } from '@angular/core';
import { hookNavigator, NavigatorNode } from '@c8y/ngx-components';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    hookNavigator(
      new NavigatorNode({
        priority: 20,
        icon: 'map',
        label: 'Map examples'
      })
    )
  ]
})
export class MapExamplesModule {}
