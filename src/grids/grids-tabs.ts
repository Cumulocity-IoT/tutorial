import { Injectable } from '@angular/core';
import { TabFactory, Tab } from '@c8y/ngx-components';
import { Router } from '@angular/router';

@Injectable()
export class GridsTabs implements TabFactory {
  constructor(public router: Router) {}

  get() {
    const tabs: Tab[] = [];

    if (this.router.url.match(/data-grid/g)) {
      tabs.push({
        icon: 'resume-website',
        priority: 1000,
        label: 'Client-side data grid',
        path: 'data-grid/client-grid-example'
      } as Tab);

      tabs.push({
        icon: 'server',
        priority: 900,
        label: 'Server-side data grid',
        path: 'data-grid/server-grid-example'
      } as Tab);

      tabs.push({
        icon: 'c8y-device-management',
        priority: 800,
        label: 'Device grid',
        path: 'data-grid/device-grid-example'
      } as Tab);
    }

    return tabs;
  }
}
