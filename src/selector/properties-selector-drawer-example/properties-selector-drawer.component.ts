import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IIdentified, IManagedObject, InventoryService } from '@c8y/client';
import { BottomDrawerService, TitleComponent } from '@c8y/ngx-components';
import {
  AssetPropertySelectorDrawerComponent,
  AssetPropertyType
} from '@c8y/ngx-components/asset-properties';
import {
  AssetSelectionChangeEvent,
  AssetSelectorModule
} from '@c8y/ngx-components/assets-navigator';
import { SubAssetsModule } from '@c8y/ngx-components/sub-assets';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'tut-properties-selector-drawer',
  template: `<c8y-title>Properties selector- drawer</c8y-title>
    <div class="d-flex row">
      <div class="col-xs-12 col-md-6">
        <div class="card">
          <div class="card-inner-scroll d-flex d-col bg-component" style="height: 490px">
            <c8y-asset-selector
              [(ngModel)]="model"
              [config]="{
                groupsSelectable: true,
                showUnassignedDevices: true,
                showChildDevices: true
              }"
              (onSelected)="selectionChanged($event)"
            ></c8y-asset-selector>
          </div>
          <div class="card-footer separator-top">
            <button class="btn btn-primary" (click)="selectProperty()" [disabled]="!selectedAsset">
              Select property
            </button>
          </div>
        </div>
      </div>

      <div class="col-xs-12 col-md-6">
        <pre class="inner-scroll m-0" style="height: 554px">{{ output | json }}</pre>
      </div>
    </div>`,
  imports: [
    AssetSelectorModule,
    TitleComponent,
    FormsModule,
    SubAssetsModule,
    TooltipModule,
    JsonPipe
  ]
})
export class PropertiesSelectorDrawerExampleComponent {
  inventoryService = inject(InventoryService);
  model: IIdentified;
  selectedAsset: IManagedObject;
  output: AssetPropertyType[] = [];
  bottomDrawerService = inject(BottomDrawerService);

  selectionChanged(e: AssetSelectionChangeEvent) {
    this.selectedAsset = e.change.item;
  }

  async selectProperty() {
    const drawer = this.bottomDrawerService.openDrawer(AssetPropertySelectorDrawerComponent, {
      disableClickOutside: true,
      initialState: {
        asset: this.selectedAsset,
        config: {
          selectMode: 'single',
          expansionMode: 'collapsedByDefault',
          showValue: true,
          showKey: true,
          emptyStateContent: 'default-properties',
          selectedProperties: this.output
        }
      }
    });

    try {
      const resultOf = await drawer.instance.result;
      this.output = resultOf;
    } catch (ex) {
      this.output = [];
    }
  }
}
