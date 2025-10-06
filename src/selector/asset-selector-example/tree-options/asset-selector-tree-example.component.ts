import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { IIdentified } from '@c8y/client';

@Component({
  selector: 'c8y-asset-selector-tree-example',
  template: `<c8y-title>Tree options</c8y-title>
    <div class="row d-flex-sm">
      <div class="col-sm-4 p-0">
        <div class="d-col p-t-8 p-l-16 p-b-16 p-r-16 bg-level-1 form-group-sm">
          <p class="text-medium p-b-16">Config options</p>
          <label>Label</label>
          <div class="input-group input-group-sm">
            <input class="form-control" type="text" [(ngModel)]="config.label" />
            <div class="input-group-btn">
              <button class="btn btn-default" (click)="reloadComponent()">
                {{ 'Apply' | translate }}
              </button>
            </div>
          </div>
          <ng-container *ngFor="let item of config | keyvalue">
            <label class="c8y-checkbox m-t-8" title="{{ item.key }}" *ngIf="item.key != 'label'">
              <input
                class="form-control"
                type="checkbox"
                [(ngModel)]="config[item.key]"
                (ngModelChange)="reloadComponent()"
              />
              <span></span> <span>{{ item.key }}</span>
            </label>
          </ng-container>
          <pre class="m-t-16 inner-scroll small">{{ config | json }}</pre>
        </div>
      </div>
      <div class="col-sm-8">
        <ng-container *ngIf="showComponent">
          <p class="text-medium p-t-8">Preview</p>
          <div class="card m-t-16">
            <div class="card-block p-0 bg-inherit" style="height: 428px">
              <c8y-asset-selector
                class="bg-inherit"
                [(ngModel)]="model"
                (onSelected)="selectionChanged($event)"
                [config]="config"
              ></c8y-asset-selector>
            </div>
          </div>
        </ng-container>
      </div>
    </div>`,
  standalone: true,
  imports: [CommonModule, AssetSelectorModule, CoreModule]
})
export class AssetSelectorTreeExampleComponent {
  model: IIdentified;
  showComponent = true;
  config = {
    groupsSelectable: true,
    groupsOnly: false,
    multi: false,
    required: false,
    search: false,
    showChildDevices: false,
    showUnassignedDevices: false,
    label: 'Asset selection',
    showSelected: true
  };

  reloadComponent() {
    // Reload the component by toggling the flag
    this.showComponent = false;
    setTimeout(() => {
      this.showComponent = true;
    });
  }
  selectionChanged(e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
