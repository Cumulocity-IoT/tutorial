import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator } from '@c8y/ngx-components';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    hookNavigator(
      new NavigatorNode({
        label: 'Dynamic forms',
        icon: 'file-text'
      })
    )
  ]
})
export class DynamicFormsTutorialModule {}
