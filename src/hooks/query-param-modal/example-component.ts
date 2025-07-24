import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-example-component',
  template: `<p>This component was rendered via <code>hookQueryParamModal</code></p>
    <button class="btn btn-default" title="{{ 'Close' }}" type="button" (click)="cancel()">
      {{ 'Close' }}
    </button>`
})
export class ExampleComponent {
  private readonly bsModalRef = inject(BsModalRef);

  cancel() {
    this.bsModalRef.hide();
  }
}
