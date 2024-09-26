import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbService, CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'tut-breadcrumbs-example',
  templateUrl: './breadcrumbs-example.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule]
})
export class BreadcrumbsExampleComponents {
  constructor(public breadcrumbService: BreadcrumbService) {}
}
