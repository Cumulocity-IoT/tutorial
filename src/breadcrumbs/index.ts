import { hookNavigator, NavigatorNode } from '@c8y/ngx-components';

export * from './basic-example/breadcrumbs-example.module';
export * from './expand-example/breadcrumbs-expand-example.module';
export * from './outlet/breadcrumbs-outlet-example.module';
export * from './content-projection/breadcrumbs-content-projection-example.module';

export function provideBreadcrumbsNavigator() {
  return [
    hookNavigator(
      new NavigatorNode({
        icon: 'notification',
        label: 'Breadcrumbs'
      })
    )
  ];
}
