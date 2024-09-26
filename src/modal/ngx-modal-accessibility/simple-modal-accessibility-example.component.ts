import { Component } from '@angular/core';
import {
  CommonModule,
  FormsModule,
  HeaderModule,
  ListGroupModule,
  ModalLabels,
  ModalModule
} from '@c8y/ngx-components';

@Component({
  selector: 'tut-simple-modal-with-selectors',
  template: `
    <c8y-modal
      (onClose)="onClose($event)"
      (onDismiss)="onDismiss($event)"
      [labels]="labels"
      [headerClasses]="'dialog-header'"
      [disabled]="true"
    >
      <ng-container c8y-modal-title>
        <span [c8yIcon]="'export'"></span>
        <div class="modal-title" id="modal-title-custom">Export documents</div>
      </ng-container>
      <c8y-list-group id="modal-body-custom">
        <c8y-li *ngFor="let a of listArray; let index = index">
          <c8y-li-checkbox></c8y-li-checkbox>
          <c8y-li-icon icon="file"></c8y-li-icon>
          Document {{ index + 1 }}
        </c8y-li>
      </c8y-list-group>
    </c8y-modal>
  `,
  standalone: true,
  imports: [ModalModule, HeaderModule, CommonModule, FormsModule, ListGroupModule]
})
export class SimpleModalAccessibilityExampleComponent {
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
