import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-example-component',
  template: `<p>This component was rendered via <code>hookQueryParamBottomDrawer</code></p>
    <div class="text-center card-footer p-24 separator">
      <button class="btn btn-default" title="{{ 'Close' }}" type="button" (click)="close()">
        {{ 'Close' }}
      </button>
    </div>`
})
export class ExampleComponent {
  shouldClose: Promise<boolean>;
  private resolveClose!: (value: boolean | PromiseLike<boolean>) => void;

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    this.shouldClose = new Promise<boolean>(resolve => {
      this.resolveClose = resolve;
    });
  }

  close() {
    this.resolveClose(true);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { showExampleComponent: null },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }
}
