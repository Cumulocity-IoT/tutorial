import { Component, OnInit } from '@angular/core';
import { IManagedObject, InventoryService } from '@c8y/client';
import {
  DatapointSelectorModule,
  DatapointSelectorService
} from '@c8y/ngx-components/datapoint-selector';
import { KPIDetails } from '@c8y/ngx-components/datapoint-selector/datapoint-selection.model';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';

@Component({
  selector: 'c8y-datapoint-selection-example',
  templateUrl: './datapoint-selection-example.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule, AssetSelectorModule, DatapointSelectorModule]
})
export class DatapointSelectionExampleComponent implements OnInit {
  datapoints1: KPIDetails[] = [];
  datapoints2: KPIDetails[] = [];
  datapoints3: KPIDetails[] = [];
  datapoints4: KPIDetails[] = [];
  datapoints5: KPIDetails[] = [];
  datapoints6: KPIDetails[] = [];
  datapoints7: KPIDetails[] = [];
  contextAsset: IManagedObject;

  constructor(
    private datapointSelection: DatapointSelectorService,
    private inventory: InventoryService
  ) {}

  async ngOnInit(): Promise<void> {
    const { data: groups } = await this.inventory.list({
      pageSize: 1,
      fragmentType: 'c8y_IsDeviceGroup'
    });
    this.contextAsset = groups[0];
  }

  addDatapoints(): void {
    this.datapointSelection.selectDataPoints({ selectedDatapoints: [...this.datapoints1] }).then(
      res => {
        this.datapoints1 = res;
      },
      () => {
        // nothing to do, modal was canceled
      }
    );
  }
}
