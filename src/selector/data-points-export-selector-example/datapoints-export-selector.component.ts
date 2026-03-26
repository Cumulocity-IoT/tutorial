import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AGGREGATION_VALUES, CoreModule } from '@c8y/ngx-components';
import { DatapointSelectorModule, KPIDetails } from '@c8y/ngx-components/datapoint-selector';
import {
  DatapointDetails,
  DatapointsExportSelectorComponent,
  ExportColumnConfig,
  ExportConfig,
  ExportType
} from '@c8y/ngx-components/datapoints-export-selector';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'tut-datapoints-export-selector-example',
  template: `
    <c8y-title>Data points export selector</c8y-title>
    <div class="container-fluid">
      <div class="p-16 m-b-16 separator-bottom">
        <div class="alert alert-info m-b-16">
          <strong>Tutorial toggle:</strong> Switch between export types to see the differences. The
          toggle is for demonstration purposes only.
        </div>
        <div class="d-flex gap-8 align-items-center m-b-16">
          <label
            class="c8y-switch"
            [tooltip]="
              isListExport
                ? 'Latest measurement with datapoint details: current, target, diff, and diff% values'
                : 'Timeline of measurements with Data Scope options (Compact/Full modes)'
            "
            placement="right"
            [delay]="500"
          >
            <input
              type="checkbox"
              [(ngModel)]="isListExport"
              (ngModelChange)="updateExportConfig()"
            />
            <span></span>
            <span>{{ isListExport ? 'Latest with details' : 'Time series' }}</span>
          </label>
        </div>
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
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    TooltipModule,
    DatapointsExportSelectorComponent,
    DatapointSelectorModule
  ]
})
export class DatapointsExportSelectorExampleComponent {
  config: ExportConfig | null = null;
  datapointDetails: DatapointDetails[] = [];
  datapoints: KPIDetails[] = [];
  isListExport = false;

  /**
   * Default columns for latestWithDetails export type
   */
  private readonly listColumns: ExportColumnConfig[] = [
    { id: 'kpi', label: 'Label', visible: true, order: 0 },
    { id: 'target', label: 'Target', visible: true, order: 1 },
    { id: 'current', label: 'Current', visible: true, order: 2 },
    { id: 'diff', label: 'Diff', visible: true, order: 3 },
    { id: 'diffPercentage', label: 'Diff %', visible: true, order: 4 },
    { id: 'asset', label: 'Asset', visible: true, order: 5 }
  ];

  updateExportConfig(): void {
    if (this.datapoints.length === 0) {
      return;
    }

    this.datapointDetails = this.datapoints.map((datapoint, index) => {
      // Mock target value for demonstration purposes
      const mockTarget = 100 + index * 10;

      return {
        deviceName: datapoint.__target.name,
        source: datapoint.__target.id,
        valueFragmentSeries: datapoint.series,
        valueFragmentType: datapoint.fragment,
        target: mockTarget,
        label: datapoint.label ?? `${datapoint.fragment}.${datapoint.series}`
      };
    });

    const { dateFrom, dateTo } = this.getDateRange();

    const exportType: ExportType = this.isListExport ? 'latestWithDetails' : 'timeSeries';

    // Base config
    this.config = {
      exportType,
      datapointDetails: this.datapointDetails,
      dateFrom,
      dateTo
    };

    // Add type-specific configuration
    if (this.isListExport) {
      // Latest with details export: includes column configuration
      this.config.columns = this.listColumns;
    } else {
      // Time series export: includes aggregation option
      this.config.aggregation = AGGREGATION_VALUES.minutely;
    }
  }

  private getDateRange(): { dateFrom: string; dateTo: string } {
    const now = Date.now();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const dateFrom = new Date(now - oneDayInMs).toISOString();
    const dateTo = new Date(now).toISOString();

    return { dateFrom, dateTo };
  }
}
