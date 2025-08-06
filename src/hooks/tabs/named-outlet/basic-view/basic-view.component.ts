import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Tab, TabsService } from '@c8y/ngx-components';
import { map } from 'rxjs';

/**
 * This is a standard angular component.
 */
@Component({
  selector: 'tut-basic-view',
  templateUrl: './basic-view.component.html',
  standalone: false
})
export class BasicViewComponent {
  tabs: Tab[] = [];

  constructor(private tabsService: TabsService) {
    this.tabsService.items$
      .pipe(
        map(tabs => tabs.filter(tab => tab.tabsOutlet === 'namedOutletTabs')),
        takeUntilDestroyed()
      )
      .subscribe(tabs => (this.tabs = tabs));
  }
}
