import { Component } from '@angular/core';
import {
  CommonModule,
  FormsModule,
  HeaderModule,
  ModalLabels,
  ModalModule,
  CoreModule
} from '@c8y/ngx-components';

@Component({
  selector: 'tut-simple-modal',
  template: `
    <c8y-modal
      title="Export documents"
      (onClose)="onClose($event)"
      (onDismiss)="onDismiss($event)"
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
  `,
  standalone: true,
  imports: [ModalModule, HeaderModule, CommonModule, FormsModule, CoreModule]
})
export class SimpleModalExampleComponent {
  labels: ModalLabels = { ok: 'Export', cancel: 'Cancel' };
  listArray = new Array(12);
  onDismiss(_) {
    // eslint-disable-next-line no-console
    console.log('On "Cancel" clicked');
  }

  onClose(_) {
    // eslint-disable-next-line no-console
    console.log('On "Export" clicked');
  }
}
