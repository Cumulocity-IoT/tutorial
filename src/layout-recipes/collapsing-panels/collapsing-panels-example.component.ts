import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  TitleComponent,
  IconDirective,
  C8yTranslatePipe,
} from '@c8y/ngx-components';

interface Plugin {
  id: string;
  name: string;
  description: string;
  type: string;
  details: string;
}

@Component({
  selector: 'c8y-collapsing-panels-example',
  templateUrl: './collapsing-panels-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BreadcrumbComponent,
    IconDirective,
    BreadcrumbItemComponent,
    TitleComponent,
    C8yTranslatePipe,
  ],
})
export class CollapsingPanelsExampleComponent {
  protected readonly selectedPlugin = signal<Plugin | null>(null);

  protected readonly plugins: Plugin[] = [
    {
      id: 'device-grid',
      name: 'Device grid',
      description: 'Enhanced data grid for device lists with custom columns and filters.',
      type: 'Widget',
      details:
        'Provides a configurable grid view for browsing devices. Supports column selection, sorting, filtering by any property, and bulk operations. Integrates with the platform device inventory API.',
    },
    {
      id: 'alarm-widget',
      name: 'Alarm widget',
      description: 'Dashboard widget showing active alarms with severity breakdown.',
      type: 'Widget',
      details:
        'Displays alarms grouped by severity (critical, major, minor, warning). Supports drill-down to device detail. Configurable time range and device scope. Real-time updates via long polling.',
    },
    {
      id: 'asset-navigator',
      name: 'Asset navigator',
      description: 'Tree-based navigation panel for hierarchical asset structures.',
      type: 'Navigator',
      details:
        'Adds a collapsible tree to the left sidebar for navigating complex asset hierarchies. Lazy-loads child nodes. Supports search, drag-to-reorder, and custom icons per asset type.',
    },
    {
      id: 'measurement-chart',
      name: 'Measurement chart',
      description: 'Time-series chart for device measurements with zoom and pan.',
      type: 'Widget',
      details:
        'Renders measurement data as interactive time-series charts using ECharts. Supports multiple series, configurable aggregation, threshold lines, and CSV export.',
    },
    {
      id: 'audit-tab',
      name: 'Audit tab',
      description: 'Custom tab added to device detail showing platform audit logs.',
      type: 'Tab',
      details:
        'Hooks into device detail pages via ViewContext.Device to add an Audit tab. Loads audit log entries for the selected device and renders them as a timeline list.',
    },
  ];

  selectPlugin(plugin: Plugin): void {
    this.selectedPlugin.set(plugin);
  }

  closeDetail(): void {
    this.selectedPlugin.set(null);
  }
}
