import { NgModule } from '@angular/core';
import { hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';
import { FORMLY_CONFIG } from '@ngx-formly/core';
import { CustomFieldCheckbox } from './types/checkbox/checkbox.type.component';

@NgModule({
  imports: [CustomFieldCheckbox],
  declarations: [],
  providers: [
    hookRoute({
      path: 'dynamic-forms/custom',
      loadComponent: () =>
        import('./custom-element-example.component').then(m => m.CustomElementExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/dynamic-forms/custom',
        label: 'Custom element',
        icon: 'cut',
        priority: 78,
        parent: 'Dynamic forms'
      })
    ),
    /* Register your custom field as Formly input type */
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useValue: {
        types: [
          {
            name: 'custom',
            component: CustomFieldCheckbox
          }
        ]
      }
    }
  ]
})
export class CustomElementExampleModule {}
