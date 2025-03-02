import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { IIdentified, IManagedObject, InventoryService } from '@c8y/client';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'asset-selector-tree-search',
  template: `<c8y-title>Asset selector</c8y-title>
    <div class="row">
      <div class="card">
        <div class="card-header separator">
          <h4 class="card-title">Tree view with global search</h4>
        </div>
        <c8y-asset-selector
          [(ngModel)]="model"
          (onSelected)="selectionChanged($event)"
          [config]="{
            groupsSelectable: true,
            multi: true,
            search: true
          }"
        ></c8y-asset-selector>
      </div>
    </div>

    <div class="col-sm-6">
      <div class="card">
        <div class="card-header separator">
          <h4 class="card-title">Tree view different root {{ (rootNode$ | async)?.id }}</h4>
        </div>
        <c8y-asset-selector
          [(ngModel)]="model"
          (onSelected)="selectionChanged($event)"
          [asset]="rootNode$ | async"
        ></c8y-asset-selector>
      </div>
    </div>
    <div class="col-xs-12 col-sm-4 col-md-3">
      <div class="card">
        <div class="card-header separator">
          <h4 class="card-title">Model</h4>
        </div>
        <div class="card-inner-scroll">
          <pre style="min-height: 98px"><code>{{ model | json }}</code></pre>
        </div>
      </div>
    </div> `,
  standalone: true,
  imports: [CommonModule, AssetSelectorModule, CoreModule]
})
export class AssetSelectorTreeSearchComponent {
  model: IIdentified;
  rootNode$ = new BehaviorSubject<IManagedObject>(undefined);

  constructor(private inventory: InventoryService) {
    this.loadFirstSubGroup();
  }

  async loadFirstSubGroup() {
    const { data } = await this.inventory.list({ type: 'c8y_DeviceSubgroup', pageSize: 1 });
    if (data.length === 1) {
      this.rootNode$.next(data[0]);
    }
  }

  selectionChanged(e) {
    console.log(e);
  }
}
