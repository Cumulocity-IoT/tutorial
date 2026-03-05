import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CoreModule,
  DynamicComponentAlert,
  DynamicComponentAlertAggregator,
  WidgetTimeContextDateRangeService,
  DateAndTimeOptions
} from '@c8y/ngx-components';
import { TimeContextComponent } from '@c8y/ngx-components/time-context';
import {
  AlarmOrEventExtended,
  CHART_VIEW_CONTEXT,
  ChartAlarmsService,
  ChartEventsService,
  ChartHelpersService,
  ChartsComponent,
  DatapointsGraphKPIDetails,
  DatapointsGraphWidgetConfig
} from '@c8y/ngx-components/echart';
import { aggregationType } from '@c8y/client';

/**
 * This example demonstrates how to use the c8y-charts component to display
 * time-series data with datapoints, alarms, and events.
 *
 * The c8y-charts component is a powerful visualization tool that:
 * - Displays multiple datapoint series on a chart
 * - Supports real-time data updates
 * - Shows alarms and events as markers
 * - Provides zoom and pan capabilities
 * - Supports data aggregation and slider navigation
 *
 * Key features demonstrated:
 * - Basic chart configuration
 * - Handling chart events (zoom, datapoint updates)
 * - Working with alerts and notifications
 * - Chart view context management
 */
@Component({
  selector: 'app-charts-example',
  templateUrl: './charts-example.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule, FormsModule, ChartsComponent],
  providers: [
    ChartEventsService,
    ChartAlarmsService,
    ChartHelpersService,
    WidgetTimeContextDateRangeService
  ]
})
export class ChartsExampleComponent implements OnInit {
  // Chart configuration object
  config: DatapointsGraphWidgetConfig = {
    datapoints: [],
    alarmsEventsConfigs: [],
    dateFrom: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
    dateTo: new Date().toISOString(),
    interval: 'custom',
    realtime: false,
    yAxisSplitLines: true,
    xAxisSplitLines: false,
    showLabelAndUnit: true,
    showSlider: true,
    smoothLines: false,
    displayMarkedLine: true,
    displayMarkedPoint: true,
    mergeMatchingDatapoints: false,
    forceMergeDatapoints: false,
    setYaxisStartToZero: false,
    numberOfDecimalPlaces: 2
  };

  // Alert aggregator for chart notifications
  alerts = new DynamicComponentAlertAggregator();

  // Chart view context - determines the chart behavior and features
  chartViewContext = CHART_VIEW_CONTEXT.DATAPOINT_EXPLORER;

  // Active datapoints currently visible in the chart
  activeDatapoints: DatapointsGraphKPIDetails[] = [];

  // Time context reference
  @ViewChild('timeContext') timeContext: TimeContextComponent;

  // Time properties for binding to time context
  timeProps: {
    dateFrom: Date;
    dateTo: Date;
    interval?: string;
    realtime?: boolean;
    aggregation?: aggregationType | null;
  };

  // Time picker configuration
  readonly TIME_PICKER_CONFIG: DateAndTimeOptions = {
    showMinutes: true,
    showSeconds: true,
    showSpinners: false
  };

  // Flag to skip onTimeContextChange during zoom handling
  private isHandlingZoom = false;

  // Configuration examples
  configExamples = [
    { label: 'Basic Chart', value: 'basic' },
    { label: 'With Slider', value: 'slider' },
    { label: 'Multiple Axes', value: 'multiaxis' }
  ];

  selectedExample = 'basic';

  ngOnInit(): void {
    // Initialize with a basic configuration
    this.loadExampleConfiguration('basic');

    // Initialize timeProps from config
    if (this.config.dateFrom && this.config.dateTo) {
      this.timeProps = {
        dateFrom: new Date(this.config.dateFrom),
        dateTo: new Date(this.config.dateTo),
        interval: this.config.interval as any,
        realtime: this.config.realtime,
        aggregation: this.config.realtime ? null : this.config.aggregation
      };
    }
  }

  /**
   * Load different example configurations to demonstrate various chart capabilities
   */
  loadExampleConfiguration(example: string): void {
    this.selectedExample = example;

    switch (example) {
      case 'basic':
        this.loadBasicExample();
        break;
      case 'realtime':
        this.loadRealtimeExample();
        break;
      case 'slider':
        this.loadSliderExample();
        break;
      case 'multiaxis':
        this.loadMultiAxisExample();
        break;
    }
  }

  /**
   * Handle zoom events from the chart
   */
  onSliderZoom(timeProps: { dateFrom: Date; dateTo: Date; interval?: 'hours' | 'weeks' }): void {
    this.isHandlingZoom = true;

    const dateFrom = timeProps.dateFrom.toISOString();
    const dateTo = timeProps.dateTo.toISOString();
    const interval = timeProps.interval || 'custom';

    if (
      this.config.dateFrom === dateFrom &&
      this.config.dateTo === dateTo &&
      this.config.interval === interval &&
      this.config.realtime === false
    ) {
      this.isHandlingZoom = false;
      return;
    }

    // Update config
    this.config = {
      ...this.config,
      dateFrom,
      dateTo,
      interval,
      realtime: false,
      isAutoRefreshEnabled: false,
      refreshInterval: 0
    };

    // Update timeProps binding
    this.timeProps = {
      dateFrom: new Date(timeProps.dateFrom.getTime()),
      dateTo: new Date(timeProps.dateTo.getTime()),
      interval: 'custom',
      realtime: false
    };

    this.isHandlingZoom = false;
  }

  /**
   * Handle real-time updates to the time range
   */
  updateTimeRangeOnRealtime(
    timeRange: Pick<DatapointsGraphWidgetConfig, 'dateFrom' | 'dateTo'>
  ): void {
    if (this.config.dateFrom === timeRange.dateFrom && this.config.dateTo === timeRange.dateTo) {
      return;
    }

    this.config = {
      ...this.config,
      ...timeRange
    };

    // Update timeProps for time context
    if (timeRange.dateFrom && timeRange.dateTo) {
      this.timeProps = {
        ...this.timeProps,
        dateFrom: new Date(timeRange.dateFrom),
        dateTo: new Date(timeRange.dateTo)
      };
    }
  }

  /**
   * Handle datapoint synchronization issues
   */
  handleDatapointOutOfSync(datapoint: DatapointsGraphKPIDetails): void {
    console.warn('Datapoint out of sync:', datapoint);

    const alert = new DynamicComponentAlert({
      type: 'warning',
      text: 'Datapoint out of sync: ' + datapoint.label
    });

    this.alerts?.addAlerts(alert);
  }

  /**
   * Update alarms and events displayed on the chart
   */
  updateAlarmsAndEvents(alarmsEventsConfigs: AlarmOrEventExtended[]): void {
    if (this.config.alarmsEventsConfigs === alarmsEventsConfigs) {
      return;
    }

    this.config = {
      ...this.config,
      alarmsEventsConfigs
    };
  }

  /**
   * Track which datapoints are currently active and visible
   */
  updateActiveDatapoints(activeDatapoints: DatapointsGraphKPIDetails[]): void {
    this.activeDatapoints = activeDatapoints;
    console.log('Active datapoints:', activeDatapoints.length);
  }

  /**
   * Handle marked area state changes (when alarms are clicked)
   */
  onMarkedAreaEnabled(isEnabled: boolean): void {
    console.log('Marked area enabled:', isEnabled);
  }

  /**
   * Handle aggregated slider datapoint selection
   */
  updateAggregatedSliderDatapoint(selectedDatapoint: any): void {
    console.log('Aggregated slider datapoint updated:', selectedDatapoint);
  }

  /**
   * Toggle a configuration option
   */
  toggleOption(option: keyof DatapointsGraphWidgetConfig): void {
    this.config = {
      ...this.config,
      [option]: !this.config[option]
    };
  }

  /**
   * Basic chart example with simple configuration
   */
  private loadBasicExample(): void {
    this.config = {
      ...this.config,
      datapoints: this.createSampleDatapoints(2),
      dateFrom: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      dateTo: new Date().toISOString(),
      interval: 'custom',
      realtime: false,
      showSlider: false,
      yAxisSplitLines: true,
      xAxisSplitLines: false
    };
  }

  /**
   * Real-time chart example with auto-refresh
   */
  private loadRealtimeExample(): void {
    this.config = {
      ...this.config,
      datapoints: this.createSampleDatapoints(1),
      dateFrom: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
      dateTo: new Date().toISOString(),
      interval: 'hours',
      realtime: true,
      isAutoRefreshEnabled: true,
      refreshInterval: 5000,
      showSlider: false
    };
  }

  /**
   * Chart with slider for data exploration
   */
  private loadSliderExample(): void {
    this.config = {
      ...this.config,
      datapoints: this.createSampleDatapoints(3),
      dateFrom: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      dateTo: new Date().toISOString(),
      interval: 'weeks',
      realtime: false,
      showSlider: true,
      aggregation: aggregationType.HOURLY
    };
  }

  /**
   * Chart with multiple Y-axes for different data types
   */
  private loadMultiAxisExample(): void {
    this.config = {
      ...this.config,
      datapoints: this.createSampleDatapoints(4, true),
      dateFrom: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      dateTo: new Date().toISOString(),
      interval: 'custom',
      realtime: false,
      showSlider: true,
      mergeMatchingDatapoints: false,
      showLabelAndUnit: true
    };
  }

  /**
   * Create sample datapoints for demonstration
   * In a real application, these would come from your device/asset data
   */
  private createSampleDatapoints(count: number, variedUnits = false): DatapointsGraphKPIDetails[] {
    const datapoints: DatapointsGraphKPIDetails[] = [];
    const units = variedUnits ? ['°C', '%', 'kWh', 'bar'] : ['°C'];

    for (let i = 0; i < count; i++) {
      datapoints.push({
        __target: { id: `device${i + 1}`, name: `Device ${i + 1}` },
        fragment: 'c8y_Battery',
        series: '%',
        label: `Temperature ${i + 1}`,
        unit: units[i % units.length],
        color: this.getColorForIndex(i),
        lineType: 'line',
        renderType: 'min',
        __active: true
      } as any);
    }

    return datapoints;
  }

  /**
   * Get a color for a datapoint based on its index
   */
  private getColorForIndex(index: number): string {
    const colors = ['#1776BF', '#14A68E', '#F3B511', '#E66C37', '#9D5BBA'];
    return colors[index % colors.length];
  }
}
