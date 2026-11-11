import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { CommonModule } from '@angular/common';

/**
 * Anatomy of a dashboard: the `c8y-dashboard` grid wrapping several
 * `c8y-dashboard-child` widgets, each declaring a title, content, and its
 * grid position and size via the `x`, `y`, `width` and `height` inputs.
 */
@Component({
  selector: 'tut-custom-dashboard',
  templateUrl: './custom-dashboard.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule],
})
export class CustomDashboardComponent {}
