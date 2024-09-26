import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  C8yTranslateModule,
  CoreModule,
  FormsModule,
  HeaderModule,
  ModalModule
} from '@c8y/ngx-components';
import { SmallModalExampleComponent } from './small-modal-example.component';
import { MediumModalExampleComponent } from './medium-modal-example.component';
import { LargeModalExampleComponent } from './large-modal-example.component';

@Component({
  selector: 'tut-ngx-modal-sizes',
  template: `<div>
    <c8y-title>ngx-bootstrap modal sizes example</c8y-title>
    <div class="p-t-24 p-b-24 text-center">
      <button class="btn btn-default m-8" type="button" (click)="openModalSm()">
        Modal with size <code>modal-sm</code>
      </button>
    </div>
    <div class="p-b-24 text-center">
      <button class="btn btn-default m-8" type="button" (click)="openModalMd()">
        Modal with size <code>modal-md</code>
      </button>
    </div>
    <div class="p-b-24 text-center">
      <button class="btn btn-default m-8" type="button" (click)="openModalLg()">
        Modal with size <code>modal-lg</code>
      </button>
    </div>
  </div>`,
  standalone: true,
  imports: [HeaderModule, C8yTranslateModule, FormsModule, ModalModule, CoreModule]
})
export class NgxModalSizesExampleComponent {
  constructor(private modalService: BsModalService) {}

  openModalSm() {
    this.modalService.show(SmallModalExampleComponent, {
      class: 'modal-sm',
      ariaDescribedby: 'modal-body',
      ariaLabelledBy: 'modal-title',
      ignoreBackdropClick: true
    }).content as SmallModalExampleComponent;
  }

  openModalMd() {
    this.modalService.show(MediumModalExampleComponent, {
      class: 'modal-md',
      ariaDescribedby: 'modal-body',
      ariaLabelledBy: 'modal-title',
      ignoreBackdropClick: true
    }).content as MediumModalExampleComponent;
  }

  openModalLg() {
    this.modalService.show(LargeModalExampleComponent, {
      class: 'modal-lg',
      ariaDescribedby: 'modal-body',
      ariaLabelledBy: 'modal-title',
      ignoreBackdropClick: true
    }).content as LargeModalExampleComponent;
  }
}
