import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { CoreModule, DashboardChildDimension } from '@c8y/ngx-components';
import { CommonModule } from '@angular/common';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { DatapointSelectorModule } from '@c8y/ngx-components/datapoint-selector';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tut-custom-dashboard',
  templateUrl: './custom-dashboard.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule, AssetSelectorModule, DatapointSelectorModule]
})
export class CustomDashboardComponent implements AfterViewInit, OnDestroy {
  widgets = [
    { x: 0, y: 0, width: 12, height: 1 },
    { x: 3, y: 1, width: 5, height: 2 }
  ] as DashboardChildDimension[];
  isFrozen = false;
  showTitle = true;
  editComponent = false;

  @ViewChild('configForm', { static: false })
  configForm: NgForm;

  subscription: Subscription;

  ngAfterViewInit() {
    this.subscription = this.configForm.valueChanges.subscribe(value =>
      console.log('Widget config:', value)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Add a random child to the dashboard.
   */
  addRandom() {
    let width = Math.round(Math.random() * 10);
    if (width < 2) {
      width += 2;
    }

    let height = Math.round(Math.random() * 10);
    if (height < 1) {
      height += 1;
    }
    this.widgets.push({ width, height });
  }

  /**
   * Called when the user change the dashboard
   */
  dashboardChange(event) {
    console.log(event);
  }
}
