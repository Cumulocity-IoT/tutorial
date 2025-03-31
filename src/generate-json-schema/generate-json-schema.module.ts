import { NgModule } from '@angular/core';
import { hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'generate-json-schema',
      loadComponent: () =>
        import('./generate-json-schema.component').then(m => m.GenerateJsonSchemaComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'JSON schema',
        path: 'generate-json-schema',
        icon: 'code1'
      })
    )
  ]
})
export class GenerateJsonSchemaModule {}
