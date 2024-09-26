import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'translations/dynamic-form-translation',
      loadComponent: () =>
        import('./dynamic-form-translation.component').then(m => m.DynamicFormTranslationComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 994,
        path: 'translations/dynamic-form-translation',
        icon: 'rocket',
        label: 'Dynamic form translation',
        parent: 'Translations'
      })
    )
  ]
})
export class DynamicFormTranslationModule {}
