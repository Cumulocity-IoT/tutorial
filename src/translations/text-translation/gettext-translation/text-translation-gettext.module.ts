import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'translations/text-translation/gettext-translation',
      loadComponent: () =>
        import('./text-translation-gettext.component').then(m => m.TextTranslationGettextComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 995,
        path: 'translations/text-translation/gettext-translation',
        icon: 'rocket',
        label: 'Text translation by gettext',
        parent: 'Translations'
      })
    )
  ]
})
export class TextTranslationGettextModule {}
