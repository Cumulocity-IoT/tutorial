import { Injectable } from '@angular/core';
import { TabFactory, Tab } from '@c8y/ngx-components';
import { Router } from '@angular/router';

@Injectable()
export class ExampleTabFactory implements TabFactory {
  // Inject the angular Router
  constructor(public router: Router) {}

  // Implement the get()-method which is called to receive the tabs on each navigation
  get() {
    const tabs: Tab[] = [];
    /**
     *  We want to define two tabs:
     *    - Awesome
     *    - Outstanding
     * but these tabs should only displayed if the URL matches
     */
    if (this.router.url.match(/\/tabs/g)) {
      /**
       * mandatory for a Tab is the path (string) and the label (string)
       * A click on the tab will load the given path and therefore angular loads the
       * specified component.
       */
      tabs.push({
        path: 'hooks/tabs/awesome',
        priority: 1000,
        label: 'Awesome',
        icon: 'star'
      } as Tab);

      tabs.push({
        path: 'hooks/tabs/outstanding',
        priority: 1001,
        label: 'Outstanding',
        icon: 'diamond'
      } as Tab);
    }

    // We also define two more tabs for the "inline" tabs which
    // are rendered into any <c8y-tabs-outlet outletName="inline-example"> component
    tabs.push({
      path: 'inline1',
      priority: 1000,
      label: 'Inline 1',
      icon: 'diamond',
      tabsOutlet: 'inline-example'
    } as Tab);

    tabs.push({
      path: 'inline2',
      priority: 1000,
      label: 'Inline 2',
      icon: 'diamond',
      tabsOutlet: 'inline-example'
    } as Tab);

    return tabs;
  }
}
