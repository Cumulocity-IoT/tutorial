import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  C8yTranslateModule,
  CoreModule,
  FormsModule,
  HeaderModule,
  ModalModule
} from '@c8y/ngx-components';
import { SimpleModalExampleWithContentSelectorsComponent } from './simple-modal-example-with-content-selectors.component';

@Component({
  selector: 'tut-ngx-modal-selectors',
  template: `<div>
    <c8y-title>ngx-bootstrap modal example with ng-content selectors</c8y-title>
    <div class="p-t-24 p-b-24 text-center">
      <button
        class="btn btn-default m-8"
        type="button"
        (click)="openComponentModalWithContentSelectors()"
      >
        Modal with <code>c8y-modal</code> and <code>ng-content</code> selectors
      </button>
    </div>
  </div>`,
  standalone: true,
  imports: [
    HeaderModule,
    SimpleModalExampleWithContentSelectorsComponent,
    C8yTranslateModule,
    FormsModule,
    ModalModule,
    CoreModule
  ]
})
export class NgxModalSelectorsExampleComponent {
  constructor(private modalService: BsModalService) {}

  openComponentModalWithContentSelectors() {
    this.modalService.show(SimpleModalExampleWithContentSelectorsComponent, {
      class: 'modal-sm',
      ariaDescribedby: 'modal-body',
      ariaLabelledBy: 'modal-title',
      ignoreBackdropClick: true
    }).content as SimpleModalExampleWithContentSelectorsComponent;
  }
}
