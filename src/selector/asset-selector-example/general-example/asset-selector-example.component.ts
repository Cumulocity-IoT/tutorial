import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InventoryService, IIdentified, IManagedObject } from '@c8y/client';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { DatapointSelectorModule } from '@c8y/ngx-components/datapoint-selector';

@Component({
  selector: 'c8y-asset-selector-example',
  templateUrl: './asset-selector-example.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule, AssetSelectorModule, DatapointSelectorModule]
})
export class AssetSelectorExampleComponent {
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
