import { Component } from '@angular/core';
import { CoreModule, Tab, TabsService } from '@c8y/ngx-components';
import { Observable } from 'rxjs';

@Component({
  selector: 'component1',
  template: 'component1',
  standalone: true
})
export class Component1 {
  ngOnInit() {
    console.log('Component 1 initialized');
  }
}
@Component({
  selector: 'component2',
  template: 'component2',
  standalone: true
})
export class Component2 {
  ngOnInit() {
    console.log('Component 2 initialized');
  }
}
@Component({
  selector: 'component3',
  template: 'component3',
  standalone: true
})
export class Component3 {
  ngOnInit() {
    console.log('Component 3 initialized');
  }
}

@Component({
  selector: 'app-dashboard-tabs',
  template: `<div>
    <c8y-title>Dashboard Tabs</c8y-title>
    <h1>Inline Tabs</h1>
    <div>
      <c8y-tabs-outlet
        [tabs]="tabs$ | async"
        [outletName]="'dashboardTabs'"
        [orientation]="'vertical'"
      >
      </c8y-tabs-outlet>
      <c8y-tab
        [label]="'Tab1'"
        [tabsOutlet]="'dashboardTabs'"
        (onSelect)="selectTab('Tab1')"
        [isActive]="selectedTab === 'Tab1'"
      >
      </c8y-tab>
      <c8y-tab
        [label]="'Tab2'"
        [tabsOutlet]="'dashboardTabs'"
        (onSelect)="selectTab('Tab2')"
        [isActive]="selectedTab === 'Tab2'"
      >
      </c8y-tab>
      <c8y-tab
        [label]="'Tab3'"
        [tabsOutlet]="'dashboardTabs'"
        (onSelect)="selectTab('Tab3')"
        [isActive]="selectedTab === 'Tab3'"
      >
      </c8y-tab>

      <ng-container [ngSwitch]="selectedTab">
        <component1 *ngSwitchCase="'Tab1'"></component1>
        <component2 *ngSwitchCase="'Tab2'"></component2>
        <component3 *ngSwitchCase="'Tab3'"></component3>
      </ng-container>
    </div>
  </div>`,
  standalone: true,
  imports: [CoreModule, Component1, Component2, Component3]
})
export class DashboardTabsComponent {
  tabs$: Observable<Tab[]>;
  selectedTab: string;

  constructor(private tabsService: TabsService) {}

  ngOnInit() {
    this.tabs$ = this.tabsService.items$;
  }

  selectTab(selectedTab: string) {
    this.selectedTab = selectedTab;
    console.log(this.selectedTab);
    this.tabsService.refresh();
  }
}
