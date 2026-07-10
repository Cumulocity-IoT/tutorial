import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'app-example-button',
  standalone: true,
  imports: [CoreModule],
  template: `
    <c8y-title>Query Param Modal</c8y-title>
    <div class="card">
      <div class="card-block">
        <p>Click the button to add a query parameter. The modal will open automatically.</p>
        <button class="btn btn-primary" (click)="addQueryParam()">Add query param</button>
      </div>
    </div>
  `,
})
export class ExampleButtonComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  addQueryParam() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { showExampleModalComponent: true },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
