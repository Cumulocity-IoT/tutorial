import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'translations/text-translation/service-translation',
      loadComponent: () =>
        import('./text-translation-by-service.component').then(
          m => m.TextTranslationByServiceComponent
        )
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 999,
        path: 'translations/text-translation/service-translation',
        icon: 'rocket',
        label: 'Text translation by service',
        parent: 'Translations'
      })
    )
  ]
})
export class TextTranslationByServiceModule {}
