import { NgModule } from '@angular/core';
import { DocLink, hookDocs, hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';
import { DocsExampleService } from './docs-example.service';

@NgModule({
  providers: [
    hookDocs({
      icon: 'c8y-icon c8y-icon-mobile-add',
      type: 'doc',
      url: 'https://cumulocity.com/docs/',
      label: 'Doc link from hookDocs'
    } as DocLink),
    hookDocs(DocsExampleService),
    hookRoute({
      path: 'hooks/docs',
      loadComponent: () =>
        import('./hook-docs-example.component').then(m => m.HookDocsExampleComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 100,
        path: 'hooks/docs',
        icon: 'document',
        label: 'Docs',
        parent: 'Hooks'
      })
    )
  ]
})
export class HookDocsModule {}
