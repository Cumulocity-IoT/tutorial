import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-example-button',
  template: ` <button (click)="addQueryParam()">Add Query Param</button> `
})
export class ExampleButtonComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  addQueryParam() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { showExampleModalComponent: true },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }
}
