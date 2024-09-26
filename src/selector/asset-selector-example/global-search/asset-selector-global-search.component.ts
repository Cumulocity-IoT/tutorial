import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { IIdentified } from '@c8y/client';

@Component({
  selector: 'asset-selector-only-devices',
  template: `<c8y-title>Asset selector</c8y-title>
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-md-9">
        <div class="card">
          <div class="card-inner-scroll d-flex d-col bg-component" style="height: 350px">
            <c8y-asset-selector-miller
              class="bg-component"
              [(ngModel)]="model"
              (onSelected)="selectionChanged($event)"
              [config]="{
                groupsSelectable: true,
                columnHeaders: true,
                showFilter: true,
                showUnassignedDevices: true,
                showChildDevices: true,
                search: true
              }"
            ></c8y-asset-selector-miller>
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
      </div>
    </div> `,
  standalone: true,
  imports: [CommonModule, AssetSelectorModule, CoreModule]
})
export class AssetSelectorGlobalSearchComponent {
  model: IIdentified;

  selectionChanged(e) {
    console.log(e);
  }
}
