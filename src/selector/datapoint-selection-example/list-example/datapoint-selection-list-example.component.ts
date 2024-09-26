import { Component } from '@angular/core';
import { DatapointSelectorModule, KPIDetails } from '@c8y/ngx-components/datapoint-selector';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'datapoint-selection-list-example',
  template: `<c8y-title>Data point selector</c8y-title>
    <div class="container-fluid p-t-24">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-9">
          <div class="card">
            <div class="card-inner-scroll d-flex d-col bg-component" style="height: 350px">
              <!-- important -->
              <c8y-datapoint-selection-list
                class="d-contents"
                [(ngModel)]="datapoints"
                [allowDragAndDrop]="false"
              >
              </c8y-datapoint-selection-list>
              <!-- /important -->
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
  imports: [CommonModule, DatapointSelectorModule, CoreModule]
})
export class DatapointSelectionListExampleComponent {
  datapoints: KPIDetails[] = [];
}
