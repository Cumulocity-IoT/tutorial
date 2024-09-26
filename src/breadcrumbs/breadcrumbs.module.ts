import { NgModule } from '@angular/core';
import { NavigatorNode, hookNavigator } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookNavigator(
      new NavigatorNode({
        icon: 'notification',
        label: 'Breadcrumbs'
      })
    )
  ]
})
export class BreadcrumbsNodeModule {}
