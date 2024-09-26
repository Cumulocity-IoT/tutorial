import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  ConfirmModalComponent,
  CoreModule,
  FormsModule,
  ModalLabels,
  ModalModule,
  Status,
  StatusType
} from '@c8y/ngx-components';
import { DeleteModalCheckboxes } from '@c8y/ngx-components/sub-assets';
import { Subject } from 'rxjs';

@Component({
  selector: 'tut-delete-modal',
  template: ` <c8y-confirm-modal
    [title]="'Delete device'"
    [status]="status"
    [labels]="labels"
    #modalRef
  >
    <form>
      <p class="text-wrap m-b-16">
        {{ 'You are about to delete device. Do you want to proceed?' }}
      </p>
      <c8y-form-group class="m-b-0">
        <label class="c8y-checkbox" title="{{ 'Delete devices' }}">
          <input name="cascade" type="checkbox" [(ngModel)]="config.cascade" />
          <span></span>
          <span class="text-break-word">
            {{ 'Also delete all devices inside asset and its subassets' }}
          </span>
        </label>
      </c8y-form-group>
    </form>
  </c8y-confirm-modal>`,
  standalone: true,
  imports: [ModalModule, FormsModule, CoreModule]
})
export class DeleteModalExampleComponent implements AfterViewInit {
  @ViewChild('modalRef', { static: false }) modalRef: ConfirmModalComponent;
  labels: ModalLabels = { ok: 'Delete', cancel: 'Cancel' };
  status: StatusType = Status.DANGER;
  closeSubject: Subject<DeleteModalCheckboxes> = new Subject();
  config: DeleteModalCheckboxes = {
    cascade: false
  };

  @Output() hideModal = new EventEmitter();

  async ngAfterViewInit() {
    try {
      await this.modalRef.result;
      this.onClose();
    } catch (error) {
      this.onDismiss();
    }
  }

  onClose() {
    // eslint-disable-next-line no-console
    console.log('You have clicked the "Delete" button!');
    // eslint-disable-next-line no-console
    console.log('Config value:', this.config);
    this.hideModal.emit();
  }

  onDismiss() {
    // eslint-disable-next-line no-console
    console.log('You have clicked "Cancel" button the modal!');
    this.hideModal.emit();
  }
}
