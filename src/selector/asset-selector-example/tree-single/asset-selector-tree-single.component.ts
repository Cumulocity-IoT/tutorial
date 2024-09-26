import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { IIdentified } from '@c8y/client';

@Component({
  selector: 'asset-selector-tree-single',
  template: `<c8y-title>Asset selector</c8y-title>
    <div class="row">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-header separator">
            <h4 class="card-title">Tree view single select child devices</h4>
          </div>
          <c8y-asset-selector
            (onSelected)="selectionChanged($event)"
            [(ngModel)]="model"
            [config]="{
              groupsSelectable: true,
              showUnassignedDevices: true,
              showChildDevices: true
            }"
          ></c8y-asset-selector>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-header separator">
            <h4 class="card-title">Tree view multi select</h4>
          </div>
          <c8y-asset-selector
            (onSelected)="selectionChanged($event)"
            [(ngModel)]="model"
            [config]="{
              groupsSelectable: true,
              multi: true
            }"
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
      </div>
    </div> `,
  standalone: true,
  imports: [CommonModule, AssetSelectorModule, CoreModule]
})
export class AssetSelectorTreeSingleComponent {
  model: IIdentified;

  selectionChanged(e) {
    console.log(e);
  }
}
