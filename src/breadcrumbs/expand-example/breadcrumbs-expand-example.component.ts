import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbService, CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'tut-breadcrumbs-expand-example',
  templateUrl: './breadcrumbs-expand-example.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule]
})
export class BreadcrumbsExpandExampleComponents {
  constructor(public breadcrumbService: BreadcrumbService) {}
}
