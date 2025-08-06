import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { DatapointSelectorModule, KPIDetails } from '@c8y/ngx-components/datapoint-selector';
import {
  DatapointDetails,
  DatapointsExportSelectorComponent,
  ExportConfig
} from '@c8y/ngx-components/datapoints-export-selector';

@Component({
  selector: 'tut-datapoints-export-selector-example',
  template: `
    <c8y-title>Data points export selector</c8y-title>
    <div class="container-fluid">
      <div class="p-16 m-b-16 separator-bottom">
        <c8y-datapoints-export-selector [exportConfig]="config"></c8y-datapoints-export-selector>
      </div>
      <div class="card">
        <div class="card-block d-flex d-col p-0" style="height: 450px;">
          <c8y-datapoint-selector
            class="d-contents"
            [allowDatapointsFromMultipleAssets]="false"
            [(ngModel)]="datapoints"
            (ngModelChange)="updateExportConfig()"
          >
          </c8y-datapoint-selector>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, CoreModule, DatapointsExportSelectorComponent, DatapointSelectorModule]
})
export class DatapointsExportSelectorExampleComponent {
  config: ExportConfig;
  datapoint: DatapointDetails;
  datapointDetails: DatapointDetails[];
  datapoints: KPIDetails[] = [];

  updateExportConfig(): void {
    if (this.datapoints.length === 0) {
      return;
    }

    this.datapointDetails = this.datapoints.map(datapoint => ({
      deviceName: datapoint.__target.name,
      source: datapoint.__target.id,
      valueFragmentSeries: datapoint.series,
      valueFragmentType: datapoint.fragment
    }));

    const { dateFrom, dateTo } = this.getDateRange();

    this.config = {
      datapointDetails: this.datapointDetails,
      dateFrom,
      dateTo
    };
  }

  private getDateRange(): { dateFrom: string; dateTo: string } {
    const baseDate = Date.now();
    const dateFrom = new Date(baseDate).toISOString();
    const dateTo = new Date(baseDate + 1).toISOString();

    return { dateFrom, dateTo };
  }
}
