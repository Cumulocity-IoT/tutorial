import { Component } from '@angular/core';
import { DatapointSelectorService, KPIDetails } from '@c8y/ngx-components/datapoint-selector';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '@c8y/ngx-components';

@Component({
  selector: 'datapoint-selection-dragdrop-example',
  template: `<c8y-title>Data point selector</c8y-title>
    <div class="container-fluid p-t-24">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-9">
          <div class="card">
            <div class="card-block d-flex d-col">
              <button class="btn btn-primary" (click)="addDatapoints()">Select data points</button>
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
  imports: [CommonModule, HeaderModule]
})
export class DatapointSelectionModalExampleComponent {
  // important
  datapoints: KPIDetails[] = [];
  constructor(private datapointSelectorService: DatapointSelectorService) {}

  addDatapoints(): void {
    this.datapointSelectorService
      .selectDataPoints({ selectedDatapoints: [...this.datapoints] })
      .then(
        res => {
          this.datapoints = res;
        },
        () => {
          // nothing to do, modal was canceled
        }
      );
  }
  // /important
}
