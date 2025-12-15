import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CoreModule,
  IconDirective,
  IconPanelComponent,
  IconPanelSection,
  ListItemBodyComponent,
  ListItemComponent,
  ListItemIconComponent,
  SplitViewComponent,
  SplitViewDetailsComponent,
  SplitViewFooterComponent,
  SplitViewListComponent,
  SplitViewListItemDirective
} from '@c8y/ngx-components';

@Component({
  selector: 'c8y-split-view-fixed-example',
  templateUrl: './split-view-fixed-example.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    ListItemComponent,
    ListItemIconComponent,
    ListItemBodyComponent,
    IconDirective,
    SplitViewComponent,
    SplitViewListComponent,
    SplitViewDetailsComponent,
    SplitViewFooterComponent,
    IconPanelComponent,
    SplitViewListItemDirective
  ]
})
export class SplitViewFixedExampleComponent {
  items = [
    {
      id: 1,
      name: 'Configuration Manager',
      type: 'System Tool',
      status: 'Ready',
      description: 'Manage application settings and preferences',
      icon: 'cog'
    },
    {
      id: 2,
      name: 'Data Analytics',
      type: 'Analytics Tool',
      status: 'Processing',
      description: 'Analyze and visualize your data',
      icon: 'c8y-chart'
    },
    {
      id: 3,
      name: 'User Management',
      type: 'Admin Tool',
      status: 'Active',
      description: 'Manage users, roles and permissions',
      icon: 'c8y-user'
    },
    {
      id: 4,
      name: 'Device Monitor',
      type: 'Monitoring Tool',
      status: 'Connected',
      description: 'Monitor device status and health',
      icon: 'c8y-device'
    },
    {
      id: 5,
      name: 'Report Generator',
      type: 'Reporting Tool',
      status: 'Idle',
      description: 'Generate custom reports and exports',
      icon: 'c8y-report'
    }
  ];

  selectedItem?: (typeof this.items)[0];
  itemInfoSections: IconPanelSection[] = [];

  onSelectionChange(item: (typeof this.items)[0] | null) {
    this.selectedItem = item || undefined;
    if (this.selectedItem) {
      this.updateItemInfoSections();
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Ready':
      case 'Active':
      case 'Connected':
        return 'badge-success';
      case 'Processing':
        return 'badge-info';
      case 'Idle':
        return 'badge-warning';
      default:
        return 'badge-system';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Ready':
      case 'Active':
        return 'ok';
      case 'Processing':
        return 'refresh';
      case 'Connected':
        return 'connected';
      case 'Idle':
        return 'pause';
      default:
        return 'info-circle';
    }
  }

  editItem() {
    console.log('Edit item clicked:', this.selectedItem.name);
    console.log('Item details:', this.selectedItem);
  }

  deleteItem() {
    console.log('Delete item clicked:', this.selectedItem.name);
    console.log('Item ID:', this.selectedItem.id);
  }

  private updateItemInfoSections() {
    const item = this.selectedItem;
    this.itemInfoSections = [
      {
        id: 'basic-info',
        label: 'Basic Information',
        icon: 'info-circle',
        iconClass: 'text-info',
        visible: true,
        content: `
          <div class="content-flex-20">
            <div class="col-6">
              <div class="d-flex a-i-center gap-4">
                <strong>Tool Type:</strong>
                <span>${item.type}</span>
              </div>
            </div>
            <div class="col-6">
              <div class="d-flex a-i-center gap-4">
                <strong class="flex-no-shrink">Current Status:</strong>
                <span class="badge ${this.getStatusClass(item.status)}">
                  <i class="icon-12 m-r-4 dlt-c8y-icon-${this.getStatusIcon(item.status)}"></i>
                  ${item.status}
                </span>
              </div>
            </div>
          </div>
          <p class="m-t-8">
            <strong>Description: </strong>
            <span>${item.description}</span>
          </p>
        `,
        colClass: 'col-xs-12'
      }
    ];
  }
}
