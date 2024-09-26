import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'translations/new-language',
      loadComponent: () => import('./new-language.component').then(m => m.NewLanguageComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 993,
        path: 'translations/new-language',
        icon: 'rocket',
        label: 'New language',
        parent: 'Translations'
      })
    )
  ]
})
export class NewLanguageModule {}
