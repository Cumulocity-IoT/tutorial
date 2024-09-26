import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  imports: [CommonModule],
  providers: [
    hookRoute({
      path: 'dynamic-forms/json',
      loadComponent: () =>
        import('./json-schema-example.component').then(m => m.JSONSchemaExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        path: '/dynamic-forms/json',
        label: 'JSON Schema',
        icon: 'c8y-css',
        priority: 79,
        parent: 'Dynamic forms'
      })
    )
  ]
})
export class JsonSchemaExampleModule {}
