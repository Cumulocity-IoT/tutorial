import { Component } from '@angular/core';
import {
  CoreModule,
  FormsModule,
  gettext,
  ModalModule,
  ModalService,
  Status
} from '@c8y/ngx-components';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DeleteModalExampleComponent } from './delete-modal-example.component';

@Component({
  selector: 'tut-confirm-modal',
  template: `<div class="p-t-24">
    <c8y-title>Confirm modal example</c8y-title>
    <div class="p-b-24 text-center">
      <button class="btn btn-default" (click)="deleteConfigurationSnapshot()">
        Confirm modal using <code>ModalService.confirm</code>
      </button>
    </div>
    <div class="p-b-24 text-center">
      <button class="btn btn-default" (click)="deleteDevice()">
        Confirm modal using <code>c8y-confirm-modal</code> component
      </button>
    </div>
  </div>`,
  standalone: true,
  imports: [ModalModule, FormsModule, CoreModule, DeleteModalExampleComponent]
})
export class ConfirmModalExampleComponent {
  constructor(
    private bsModalService: BsModalService,
    private modalService: ModalService
  ) {}

  deleteDevice() {
    this.bsModalService.show(DeleteModalExampleComponent);
  }

  async deleteConfigurationSnapshot() {
    try {
      await this.modalService.confirm(
        'Delete configuration snapshot',
        'You are about to delete the configuration snapshot DeviceA.',
        Status.DANGER,
        {
          ok: gettext('Delete')
        }
      );
      // eslint-disable-next-line no-console
      console.log('Delete clicked');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Cancel clicked');
    }
  }
}
