import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { CommonModule } from '@angular/common';

/**
 * Demonstrates widget styling and per-widget header actions:
 * - Panel CSS classes (`panel-content-branded`, `panel-content-dark`,
 *   `panel-content-transparent`, `panel-title-border`) change a widget's appearance.
 * - `c8y-dashboard-child-action` adds buttons to a widget's header.
 */
@Component({
  selector: 'tut-styled-widgets-dashboard',
  templateUrl: './styled-widgets-dashboard.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule],
})
export class StyledWidgetsDashboardComponent {
  editMode = false;
  /** The dark widget's header action switches its content between dark and light. */
  darkContent = true;
  showTitle = true;

  toggleEdit() {
    this.editMode = !this.editMode;
  }
}
