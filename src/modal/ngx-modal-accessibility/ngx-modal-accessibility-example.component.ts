import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  C8yTranslateModule,
  CoreModule,
  FormsModule,
  HeaderModule,
  ModalModule
} from '@c8y/ngx-components';
import { SimpleModalAccessibilityExampleComponent } from './simple-modal-accessibility-example.component';

@Component({
  selector: 'tut-ngx-modal-accessibility',
  template: `<div>
    <c8y-title>ngx-bootstrap modal example with custom ids</c8y-title>
    <div class="p-t-24 p-b-24 text-center">
      <button
        class="btn btn-default m-8"
        type="button"
        (click)="openComponentModalWithContentSelectors()"
      >
        Create component modal with with ModalComponent and custom ids
      </button>
    </div>
  </div>`,
  standalone: true,
  imports: [
    HeaderModule,
    SimpleModalAccessibilityExampleComponent,
    C8yTranslateModule,
    FormsModule,
    ModalModule,
    CoreModule
  ]
})
export class NgxModalAccessibilityExampleComponent {
  constructor(private modalService: BsModalService) {}

  openComponentModalWithContentSelectors() {
    this.modalService.show(SimpleModalAccessibilityExampleComponent, {
      class: 'modal-sm',
      ariaDescribedby: 'modal-body-custom',
      ariaLabelledBy: 'modal-title-custom',
      ignoreBackdropClick: true
    }).content as SimpleModalAccessibilityExampleComponent;
  }
}
