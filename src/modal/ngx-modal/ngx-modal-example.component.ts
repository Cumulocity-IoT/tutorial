import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  C8yTranslateModule,
  FormsModule,
  HeaderModule,
  ModalLabels,
  ModalModule,
  CoreModule
} from '@c8y/ngx-components';
import { SimpleModalExampleComponent } from './simple-modal-example.component';

@Component({
  selector: 'tut-ngx-modal',
  template: `<div class="p-t-24">
    <c8y-title>ngx-bootstrap modal example</c8y-title>
    <div class="p-b-24 text-center">
      <button class="btn btn-default" type="button" (click)="openTemplateModal(template)">
        Modal with <code>TemplateRef</code>
      </button>
    </div>
    <div class="p-b-24 text-center">
      <button class="btn btn-default" type="button" (click)="openC8yComponentModal()">
        Modal with <code>c8y-modal</code>
      </button>
    </div>
    <ng-template #template>
      <c8y-modal
        title="Export documents"
        (onClose)="onTemplateRefClose($event)"
        (onDismiss)="onTemplateRefDismiss($event)"
        [labels]="labels"
        [disabled]="true"
      >
        <c8y-list-group>
          <c8y-li *ngFor="let a of listArray; let index = index">
            <c8y-li-checkbox></c8y-li-checkbox>
            <c8y-li-icon icon="file"></c8y-li-icon>
            Document {{ index + 1 }}
          </c8y-li>
        </c8y-list-group>
      </c8y-modal>
    </ng-template>
  </div>`,
  standalone: true,
  imports: [
    SimpleModalExampleComponent,
    HeaderModule,
    C8yTranslateModule,
    FormsModule,
    ModalModule,
    CoreModule
  ]
})
export class NgxModalExampleComponent {
  modalRef?: BsModalRef;
  labels: ModalLabels = { ok: 'Export', cancel: 'Cancel' };
  listArray = new Array(12);
  constructor(private modalService: BsModalService) {}

  onTemplateRefDismiss(_) {
    // eslint-disable-next-line no-console
    console.log('On "Cancel" clicked');
    this.modalRef.hide();
  }

  onTemplateRefClose(_) {
    // eslint-disable-next-line no-console
    console.log('On "Export" clicked');
    this.modalRef.hide();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openTemplateModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  openC8yComponentModal(size: 'modal-sm' | 'modal-md' | 'modal-lg' = 'modal-md') {
    this.modalService.show(SimpleModalExampleComponent, {
      class: size,
      ariaDescribedby: 'modal-body',
      ariaLabelledBy: 'modal-title',
      ignoreBackdropClick: true
    }).content as SimpleModalExampleComponent;
  }
}
