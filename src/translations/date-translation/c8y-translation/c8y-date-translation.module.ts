import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'translations/date-translation/c8y-translation',
      loadComponent: () =>
        import('./c8y-date-translation.component').then(m => m.C8yDateTranslationComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 996,
        path: 'translations/date-translation/c8y-translation',
        icon: 'rocket',
        label: 'Date translation by c8y pipe',
        parent: 'Translations'
      })
    )
  ]
})
export class C8yDateTranslationModule {}
