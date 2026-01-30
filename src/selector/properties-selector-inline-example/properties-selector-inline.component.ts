import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IIdentified, IManagedObject, InventoryService } from '@c8y/client';
import { C8yTranslatePipe, TitleComponent } from '@c8y/ngx-components';
import {
  AssetPropertyActionDirective,
  AssetPropertyListComponent,
  AssetPropertyType
} from '@c8y/ngx-components/asset-properties';
import {
  AssetSelectionChangeEvent,
  AssetSelectorModule
} from '@c8y/ngx-components/assets-navigator';
import { SubAssetsModule } from '@c8y/ngx-components/sub-assets';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { JsonPipe } from '@angular/common';
import { PopoverDirective } from 'ngx-bootstrap/popover';

@Component({
  selector: 'tut-properties-selector-inline',
  template: `<c8y-title>Properties selector- inline</c8y-title>
    <div class="d-flex-md row">
      <div class="col-xs-12 col-md-3">
        <div class="card">
          <div class="inner-scroll d-flex d-col bg-component" style="height: 208px">
            <c8y-asset-selector
              class="bg-component"
              [(ngModel)]="model"
              [config]="{
                groupsSelectable: true,
                showUnassignedDevices: true,
                showChildDevices: true
              }"
              (onSelected)="selectionChanged($event)"
            ></c8y-asset-selector>
          </div>
        </div>
        <div class="card bg-level-1 p-16">
          <p class="text-medium">Config options</p>
          <fieldset class="c8y-fieldset m-b-16">
            <legend>Select mode</legend>
            <div class="d-flex gap-16 p-b-8">
              <label class="c8y-radio">
                <input name="assetSelection" type="radio" value="multi" [(ngModel)]="multiSelect" />
                <span></span>
                <span class="small m-l-4">multi</span>
              </label>
              <label class="c8y-radio">
                <input
                  name="assetSelection"
                  type="radio"
                  value="single"
                  [(ngModel)]="multiSelect"
                />
                <span></span>
                <span class="small m-l-4">single</span>
              </label>
              <label class="c8y-radio">
                <input name="assetSelection" type="radio" value="none" [(ngModel)]="multiSelect" />
                <span></span>
                <span class="small m-l-4">none</span>
              </label>
            </div>
          </fieldset>
          <fieldset class="c8y-fieldset m-t-0">
            <legend>Expansion mode</legend>
            <div class="d-flex gap-8 p-b-8">
              <label class="c8y-radio">
                <input
                  name="expansionMode"
                  type="radio"
                  value="expandedByDefault"
                  [(ngModel)]="expansionMode"
                />
                <span></span>
                <span class="small m-l-4">expanded</span>
              </label>
              <label class="c8y-radio">
                <input
                  name="expansionMode"
                  type="radio"
                  value="collapsedByDefault"
                  [(ngModel)]="expansionMode"
                />
                <span></span>
                <span class="small m-l-4">collapsed</span>
              </label>
              <label class="c8y-radio">
                <input
                  name="expansionMode"
                  type="radio"
                  value="nonCollapsible"
                  [(ngModel)]="expansionMode"
                />
                <span></span>
                <span class="small m-l-4">nonCollapsible</span>
              </label>
            </div>
          </fieldset>
          <label class="c8y-switch">
            <input type="checkbox" [(ngModel)]="filterable" />
            <span></span>
            <small>searchable</small>
          </label>
          <label class="c8y-switch m-0">
            <input type="checkbox" [(ngModel)]="showHeader" />
            <span></span>
            <small>showHeader</small>
          </label>
          <label class="c8y-switch m-0">
            <input type="checkbox" [(ngModel)]="showValue" />
            <span></span>
            <small>showValue</small>
          </label>
          <label class="c8y-switch m-0">
            <input type="checkbox" [(ngModel)]="showKey" />
            <span></span>
            <small>showKey</small>
          </label>
          <label class="c8y-switch m-0">
            <input type="checkbox" [(ngModel)]="allowAddingCustomProperties" />
            <span></span>
            <small>allowAddingCustomProperties</small>
          </label>
          <label class="c8y-switch m-0">
            <input type="checkbox" [(ngModel)]="allowDragAndDrop" />
            <span></span>
            <small>allowDragAndDrop</small>
          </label>
          <label class="c8y-switch m-0">
            <input type="checkbox" [(ngModel)]="usePreselectedProperties" />
            <span></span>
            <small>Use preselected properties</small>
            <button
              class="btn-help btn-help--sm"
              [attr.aria-label]="'Help' | translate"
              [popover]="helpRef"
              placement="right"
              triggers="focus"
              container="body"
              type="button"
              [adaptivePosition]="true"
            ></button>
            <ng-template #helpRef>
              <div [innerHTML]="preselectedPropertiesHelpText"></div>
            </ng-template>
          </label>
        </div>
      </div>
      <div class="col-xs-12 col-md-5">
        <div class="card">
          <div class="inner-scroll d-flex d-col bg-component" style="height: 655px">
            <c8y-asset-property-list
              class="bg-component"
              [asset]="selectedAsset"
              [config]="{
                selectMode: multiSelect,
                showHeader: showHeader,
                filterable: filterable,
                showValue: showValue,
                expansionMode: expansionMode,
                showKey: showKey,
                allowAddingCustomProperties: allowAddingCustomProperties,
                allowDragAndDrop: allowDragAndDrop,
                selectedProperties: usePreselectedProperties ? selectedProperties : []
              }"
              (selectedProperties)="onSelectedProperties($event)"
            >
              <button
                class="btn-dot btn fit-h"
                [attr.aria-label]="'Copy' | translate"
                tooltip="{{ 'Copy' | translate }}"
                type="button"
                *c8yAssetPropertyAction="let context"
                [delay]="500"
                (click)="copyProperty(context)"
              >
                <i class="dlt-c8y-icon-copy"></i>
              </button>
            </c8y-asset-property-list>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <pre class="inner-scroll" style="height: 655px">{{ assetPropertiesOutput | json }}</pre>
      </div>
    </div>`,
  standalone: true,
  imports: [
    AssetSelectorModule,
    AssetPropertyListComponent,
    TitleComponent,
    FormsModule,
    SubAssetsModule,
    AssetPropertyActionDirective,
    C8yTranslatePipe,
    TooltipModule,
    JsonPipe,
    PopoverDirective
  ]
})
export class PropertiesSelectorInlineExampleComponent {
  selectedProperties: AssetPropertyType[] = [
    {
      label: 'id',
      name: 'id',
      type: 'string',
      isEditable: true,
      c8y_JsonSchema: {
        properties: {
          id: {
            key: 'id',
            type: 'string',
            label: 'id',
            properties: {}
          }
        }
      },
      active: true
    },
    {
      title: 'critical',
      type: 'number',
      name: 'critical',
      label: 'critical',
      keyPath: ['c8y_ActiveAlarmsStatus', 'critical'],
      active: true
    }
  ];
  preselectedPropertiesHelpText = `Use preselected properties defined in the component code: \n
                <pre>${JSON.stringify(this.selectedProperties, null, 2)}</pre>`;
  inventoryService = inject(InventoryService);
  model: IIdentified;
  selectedAsset: IManagedObject;
  assetPropertiesOutput: AssetPropertyType[] | AssetPropertyType;

  multiSelect: 'single' | 'multi' | 'none' = 'multi';
  expansionMode: 'expandedByDefault' | 'collapsedByDefault' | 'nonCollapsible' =
    'expandedByDefault';
  showHeader = true;
  showValue = true;
  showKey = true;
  filterable = true;
  allowAddingCustomProperties = true;
  allowDragAndDrop = true;
  usePreselectedProperties = false;

  selectionChanged(e: AssetSelectionChangeEvent) {
    this.selectedAsset = e.change.item;
  }

  onSelectedProperties($event: AssetPropertyType[]) {
    this.assetPropertiesOutput = $event;
    // console.log('Selected properties:', $event);
  }

  copyProperty(context: AssetPropertyType) {
    this.assetPropertiesOutput = context;
    // console.log('Copy property:', context);
  }
}
