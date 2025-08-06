import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { ContextDashboardModule } from '@c8y/ngx-components/context-dashboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tut-context-dashboard',
  template: `<c8y-title>Context dashboard</c8y-title>
    <c8y-context-dashboard name="example-widget" [canDelete]="false"></c8y-context-dashboard> `,
  standalone: true,
  imports: [ContextDashboardModule, CoreModule, CommonModule]
})
export class ContextDashboardComponent {}
