import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Tab, TabFactory } from '@c8y/ngx-components';

@Injectable()
export class TreeGridTabFactory implements TabFactory {
  constructor(public router: Router) {}
  get() {
    const tabs: Tab[] = [];
    if (this.router.url.match(/grids\/tree-grid-example/g)) {
      tabs.push(
        {
          path: 'grids/tree-grid-example/server',
          label: 'Server side data',
          icon: 'server',
          priority: 1050,
          orientation: 'horizontal'
        } as Tab,
        {
          path: 'grids/tree-grid-example/client',
          label: 'Client side data',
          icon: 'house',
          priority: 1000,
          orientation: 'horizontal'
        } as Tab
      );
    }

    return tabs;
  }
}
