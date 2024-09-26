import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'translations/text-translation/ng-translation',
      loadComponent: () =>
        import('./date-translation.component').then(m => m.DateTranslationComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 995,
        path: 'translations/text-translation/ng-translation',
        icon: 'rocket',
        label: 'Date translation by Angular pipe',
        parent: 'Translations'
      })
    )
  ]
})
export class DateTranslationModule {}
