import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbService, CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'tut-breadcrumbs-outlet-example',
  templateUrl: './breadcrumbs-outlet-example.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule]
})
export class BreadcrumbsOutletExampleComponent {
  constructor(public breadcrumbService: BreadcrumbService) {}
}
