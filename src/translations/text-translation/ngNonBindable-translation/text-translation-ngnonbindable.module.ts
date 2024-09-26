import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'translations/text-translation/ngNonBindable-translation',
      loadComponent: () =>
        import('./text-translation-ngnonbindable.component').then(
          m => m.TextTranslationNgnonbindableComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 997,
        path: 'translations/text-translation/ngNonBindable-translation',
        icon: 'rocket',
        label: 'Text translation',
        parent: 'Translations'
      })
    )
  ]
})
export class TextTranslationNgnonbindableModule {}
