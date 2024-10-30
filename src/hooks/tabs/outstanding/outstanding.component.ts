import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule, OptionsService, TabsService } from '@c8y/ngx-components';

/**
 * This is a standard angular component.
 * Obviously it does not do anything.
 * The ExampleTabFactory in ../../hooks/tabs.ts defines two tabs:
 *  - Awesome
 *  - Outstanding
 */
@Component({
  selector: 'outstanding',
  templateUrl: './outstanding.component.html',
  standalone: true,
  imports: [CoreModule, RouterModule]
})
export class OutstandingComponent {
  constructor(
    private optionsService: OptionsService,
    private tabsService: TabsService
  ) {}

  toggleOrientation() {
    this.optionsService.tabsHorizontal = !this.optionsService.tabsHorizontal;
    this.tabsService.refresh();
  }
}
