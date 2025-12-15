import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CoreModule,
  SplitViewComponent,
  SplitViewFooterComponent,
  SplitViewHeaderActionsComponent,
  SplitViewListComponent
} from '@c8y/ngx-components';

@Component({
  selector: 'c8y-split-view-full-width-example',
  templateUrl: './split-view-full-width-example.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    SplitViewComponent,
    SplitViewListComponent,
    SplitViewHeaderActionsComponent,
    SplitViewFooterComponent
  ]
})
export class SplitViewFullWidthExampleComponent {
  items = [
    {
      id: 1,
      name: 'Project Alpha',
      description: 'Web application development project',
      status: 'In Progress',
      progress: 75
    },
    {
      id: 2,
      name: 'Project Beta',
      description: 'Mobile app development project',
      status: 'Planning',
      progress: 25
    },
    {
      id: 3,
      name: 'Project Gamma',
      description: 'API integration project',
      status: 'Completed',
      progress: 100
    },
    {
      id: 4,
      name: 'Project Delta',
      description: 'Database migration project',
      status: 'In Progress',
      progress: 55
    },
    {
      id: 5,
      name: 'Project Epsilon',
      description: 'Security audit project',
      status: 'On Hold',
      progress: 0
    }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed':
        return 'badge-success';
      case 'In Progress':
        return 'badge-info';
      case 'Planning':
        return 'badge-system';
      case 'On Hold':
        return 'badge-danger';
      default:
        return 'badge-system';
    }
  }

  getProgressClass(progress: number): string {
    if (progress === 100) return 'progress-bar-success';
    if (progress >= 75) return 'progress-bar-info';
    if (progress >= 50) return 'progress-bar-warning';
    return 'progress-bar-danger';
  }
}
