import { NgModule } from '@angular/core';
import { CoreModule, NavigatorNode, hookNavigator } from '@c8y/ngx-components';

@NgModule({
  imports: [CoreModule],
  /**
   * Adding the hooks to the providers:
   */
  providers: [
    hookNavigator(
      new NavigatorNode({
        priority: 90,
        icon: 'u-turn',
        label: 'Hooks'
      })
    )
  ]
})
export class HooksModule {}
