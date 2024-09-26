import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator } from '@c8y/ngx-components';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    hookNavigator(
      new NavigatorNode({
        priority: 20,
        icon: 'rocket',
        label: 'Translations'
      })
    )
  ]
})
export class TranslationsModule {}
