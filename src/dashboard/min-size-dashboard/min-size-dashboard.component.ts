import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { CommonModule } from '@angular/common';

/**
 * Demonstrates per-widget minimum size on c8y-dashboard-child.
 *
 * [minW] and [minH] are forwarded to GridStack, which prevents the user from
 * resizing the widget below the given number of grid columns and rows.
 */
@Component({
  selector: 'tut-min-size-dashboard',
  templateUrl: './min-size-dashboard.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule],
})
export class MinSizeDashboardComponent {
  editMode = false;

  toggleEdit() {
    this.editMode = !this.editMode;
  }
}
