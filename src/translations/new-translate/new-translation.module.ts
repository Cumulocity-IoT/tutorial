import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'translations/new-translate',
      loadComponent: () =>
        import('./new-translation.component').then(m => m.NewTranslationComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 992,
        path: 'translations/new-translate',
        icon: 'rocket',
        label: 'New translation',
        parent: 'Translations'
      })
    )
  ]
})
export class NewTranslationModule {}
