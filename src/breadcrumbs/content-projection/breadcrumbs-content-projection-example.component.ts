import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbService, CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'tut-breadcrumbs-example',
  templateUrl: './breadcrumbs-content-projection-example.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class BreadcrumbsContentProjectionExampleComponents {
  constructor(public breadcrumbService: BreadcrumbService) {}
}
