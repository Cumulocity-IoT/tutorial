import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { CommonModule } from '@angular/common';

/**
 * Demonstrates the "custom" layout mode of c8y-dashboard with alignViewHeight enabled.
 *
 * With rows=4 and alignViewHeight=true each row automatically scales to exactly
 * one quarter of the visible viewport height, so the grid always fills the screen
 * regardless of window size.
 */
@Component({
  selector: 'tut-responsive-layout-dashboard',
  templateUrl: './responsive-layout-dashboard.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule],
})
export class ResponsiveLayoutDashboardComponent {
  isFrozen = true;
  readonly rows = 4;
  readonly columns = 12;

  toggleEdit() {
    this.isFrozen = !this.isFrozen;
  }
}
