import { Component, ViewChild } from '@angular/core';
import { CommonModule, FormsModule, HeaderModule, ModalModule } from '@c8y/ngx-components';

@Component({
  selector: 'tut-simple-modal-with-selectors',
  template: `
    <c8y-modal
      title="Create smart group"
      [headerClasses]="'dialog-header'"
      [customFooter]="true"
      #modal
    >
      <ng-container c8y-modal-title>
        <span [c8yIcon]="'c8y-group-smart'"></span>
      </ng-container>

      <form class="p-24" #createSmartGroup="ngForm" c8y-modal-body>
        <c8y-form-group>
          <label for="name" translate> Smart group name </label>
          <input
            class="form-control"
            id="name"
            placeholder="{{ 'e.g. My smart group' }}"
            name="name"
            type="text"
            autocomplete="off"
            required
            [(ngModel)]="smartGroup.name"
          />
        </c8y-form-group>
      </form>

      <div class="modal-footer" c8y-modal-footer-custom>
        <button class="btn btn-default" (click)="onCustomFooterCancel()">
          {{ 'Cancel' }}
        </button>
        <button
          class="btn btn-primary"
          (click)="onCustomFooterContinue()"
          [disabled]="createSmartGroup.form.invalid || pending"
          [ngClass]="{ 'btn-pending': pending }"
        >
          {{ 'Continue' }}
        </button>
      </div>
    </c8y-modal>
  `,
  standalone: true,
  imports: [ModalModule, HeaderModule, CommonModule, FormsModule]
})
export class SimpleModalExampleWithContentSelectorsComponent {
  smartGroup = {
    name: ''
  };
  pending = false;

  @ViewChild('modal', { static: false }) private modal;

  onCustomFooterCancel(): void {
    console.log('On custom footer Cancel');
    this.modal._dismiss();
  }

  onCustomFooterContinue(): void {
    this.pending = true;
    console.log('On custom footer Continue');
    setTimeout(() => {
      this.modal._dismiss();
      this.pending = false;
    }, 1000);
  }
}
