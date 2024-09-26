import { NgModule } from '@angular/core';
import { hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'forms/form-validation',
      loadComponent: () =>
        import('./forms-validation.component').then(m => m.FormsValidationTutorialComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/forms/form-validation',
        label: 'Validation',
        icon: 'form',
        priority: 80,
        parent: 'Dynamic forms'
      })
    )
  ]
})
export class FormsTutorialModule {}
