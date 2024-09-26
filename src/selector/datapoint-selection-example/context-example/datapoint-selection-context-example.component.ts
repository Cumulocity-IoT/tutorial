import { Component } from '@angular/core';
import { DatapointSelectorModule, KPIDetails } from '@c8y/ngx-components/datapoint-selector';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { IManagedObject, InventoryService } from '@c8y/client';

@Component({
  selector: 'datapoint-selection-context-example',
  template: `<c8y-title>Data point selector</c8y-title>
    <div class="container-fluid p-t-24">
      <div class="row" *ngIf="contextAsset">
        <div class="col-xs-12 col-sm-8 col-md-9">
          <div class="card">
            <div class="card-block d-flex d-col p-0" style="height: 300px">
              <c8y-datapoint-selector
                class="d-contents"
                [contextAsset]="contextAsset"
                [allowDatapointsFromMultipleAssets]="true"
                [allowSearch]="false"
                [(ngModel)]="datapoints"
              ></c8y-datapoint-selector>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-3">
          <div class="card">
            <div class="card-header separator">
              <h4 class="card-title">Model</h4>
            </div>
            <div class="card-inner-scroll">
              <pre style="min-height: 98px"><code>{{ datapoints | json }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div> `,
  standalone: true,
  imports: [CommonModule, CoreModule, AssetSelectorModule, DatapointSelectorModule]
})
export class DatapointSelectionContextExampleComponent {
  datapoints: KPIDetails[] = [];
  contextAsset: IManagedObject;

  constructor(private inventory: InventoryService) {}

  async ngOnInit(): Promise<void> {
    const { data: groups } = await this.inventory.list({
      pageSize: 1,
      fragmentType: 'c8y_IsDeviceGroup'
    });
    this.contextAsset = groups[0];
  }
}
