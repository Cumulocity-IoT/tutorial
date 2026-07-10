import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-example-component',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Query Param Modal</h4>
    </div>
    <div class="modal-body">
      <p>This modal was opened via <code>hookQueryParamModal</code>.</p>
      <p class="text-muted">
        The URL contains <code>?showExampleModalComponent=true</code>. Closing this modal will
        remove the query parameter.
      </p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-default" type="button" (click)="cancel()">Close</button>
    </div>
  `,
})
export class ExampleComponent {
  private readonly bsModalRef = inject(BsModalRef);

  cancel() {
    this.bsModalRef.hide();
  }
}
