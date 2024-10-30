import { NgModule } from '@angular/core';
import { hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'typeahead',
      loadComponent: () =>
        import('./typeahead-example.component').then(m => m.TypeaheadExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Typeahead',
        path: 'typeahead'
      })
    )
  ]
})
export class TypeaheadExampleModule {}
