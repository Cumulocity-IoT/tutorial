import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { CommonModule } from '@angular/common';

/**
 * Demonstrates the "custom" layout mode of c8y-dashboard with float enabled.
 *
 * With [float]="true" the grid does not compact upward after a change, so widgets
 * stay exactly where they are placed and intentional empty rows are preserved.
 */
@Component({
  selector: 'tut-free-positioning-dashboard',
  templateUrl: './free-positioning-dashboard.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule],
})
export class FreePositioningDashboardComponent {
  editMode = false;

  toggleEdit() {
    this.editMode = !this.editMode;
  }
}
