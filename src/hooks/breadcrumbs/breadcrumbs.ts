import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, BreadcrumbFactory, BreadcrumbItem } from '@c8y/ngx-components';
import { get } from 'lodash-es';

/**
 * A breadcrumb is a type of secondary navigation scheme that reveals the user’s location
 * in the application.
 */
@Injectable()
export class ExampleBreadcrumbFactory implements BreadcrumbFactory {
  // Inject the angular Router
  constructor(private router: Router) {}

  // Implement the get()-method, otherwise the ExampleBreadcrumbFactory
  // implements the BreadcrumbFactory interface incorrectly (!)
  get(activatedRoute?: ActivatedRoute) {
    // Mandatory for a Breadcrumb is an array of BreadcrumbItem
    const breadcrumb: Breadcrumb = { items: [] };
    // Mandatory for a BreadcrumbItem is:
    //  - path (string)
    //  - label (string)
    const breadcrumbItems: BreadcrumbItem[] = [];

    const isTabNode: boolean =
      get(activatedRoute, 'snapshot.routeConfig.path') === 'tabs/outstanding' ||
      get(activatedRoute, 'snapshot.routeConfig.path') === 'tabs/awesome';

    const isBreadcrumbsNode: boolean =
      get(activatedRoute, 'snapshot.routeConfig.path') === 'hooks/breadcrumbs';

    if (isTabNode) {
      /**
       * Use angular router to decide if breadcrumbs should be shown.
       * The following breadcrumbs are displayed if the URL matches
       * something like: .../apps/tutorial-application/#/tabs/
       */
      if (this.router.url.match(/tabs/g)) {
        breadcrumbItems.push({
          label: 'tabs',
          icon: 'plane',
          path: '/tabs'
        });

        // if the URL is: .../apps/tutorial-application/#/tabs/awesome
        // we add another breadcrumb to show!
        if (this.router.url.match(/awesome/g)) {
          breadcrumbItems.push({
            label: 'awesome',
            path: '/tabs/awesome'
          });
        }

        // if the URL is: .../apps/tutorial-application/#/tabs/outstanding
        // we add another breadcrumb to show!
        if (this.router.url.match(/outstanding/g)) {
          breadcrumbItems.push({
            label: 'outstanding',
            path: '/tabs/outstanding'
          });
        }
      }
    }

    if (isBreadcrumbsNode) {
      /**
       * Use angular router to decide if breadcrumbs should be shown.
       * The following breadcrumbs are displayed if the URL matches
       * something like: .../apps/tutorial-application/#/hooks/
       */
      if (this.router.url.match(/hooks/g)) {
        breadcrumbItems.push({
          label: 'hooks',
          icon: 'forward',
          path: '/hooks/action'
        });

        // if the URL is: .../apps/tutorial-application/#/hooks/breadcrumb
        // we add another breadcrumb to show!
        if (this.router.url.match(/hooks\/breadcrumbs/g)) {
          breadcrumbItems.push({
            label: 'breadcrumbs',
            icon: 'forward',
            path: '/hooks/breadcrumbs'
          });
        }
      }

      breadcrumb.items = breadcrumbItems;
      return breadcrumb;
    }
  }
}
