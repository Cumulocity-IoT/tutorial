import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { IIdentified } from '@c8y/client';

@Component({
  selector: 'asset-selector-single-search',
  template: `<c8y-title>Asset selector</c8y-title>
    <div class="row">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-header separator">
            <h4 class="card-title">Miller view single select single column with global search</h4>
          </div>
          <div class="d-flex d-col p-t-0 p-b-0 bg-level-1" style="height: 300px">
            <c8y-asset-selector-miller
              [(ngModel)]="model"
              (onSelected)="selectionChanged($event)"
              [config]="{
                groupsSelectable: true,
                singleColumn: true,
                columnHeaders: true,
                showFilter: true,
                search: true
              }"
            ></c8y-asset-selector-miller>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-header separator">
            <h4 class="card-title">Miller view multi select single column</h4>
          </div>
          <div class="d-flex d-col p-t-0 p-b-0" style="height: 300px">
            <c8y-asset-selector-miller
              [(ngModel)]="model"
              (onSelected)="selectionChanged($event)"
              [config]="{
                groupsSelectable: true,
                singleColumn: true,
                columnHeaders: true,
                showFilter: true,
                multi: true
              }"
            ></c8y-asset-selector-miller>
          </div>
        </div>
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
export class AssetSelectorSingleSearchComponent {
  model: IIdentified;

  selectionChanged(e) {
    console.log(e);
  }
}
