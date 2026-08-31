import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  C8yTranslateModule,
  CoreModule,
  FormsModule,
  HeaderModule,
  ModalModule,
  ModalService,
  Status,
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
      <button class="btn btn-default m-8" type="button" (click)="closeDashboardDetails()">
        Confirm modal with default ids and initial focus
      </button>
      @if (lastConfirmChoice) {
        <p class="text-muted" role="status">You chose: {{ lastConfirmChoice }}</p>
      }
    </div>
  </div>`,
  standalone: true,
  imports: [
    HeaderModule,
    SimpleModalAccessibilityExampleComponent,
    C8yTranslateModule,
    FormsModule,
    ModalModule,
    CoreModule,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class NgxModalAccessibilityExampleComponent {
  /** The label of the button the user picked in the confirm dialog, shown instead of logging it. */
  lastConfirmChoice = '';

  constructor(
    private modalService: BsModalService,
    private modal: ModalService,
  ) {}

  openComponentModalWithContentSelectors() {
    this.modalService.show(SimpleModalAccessibilityExampleComponent, {
      class: 'modal-sm',
      ariaDescribedby: 'modal-body-custom',
      ariaLabelledBy: 'modal-title-custom',
      ignoreBackdropClick: true,
    });
  }

  /**
   * `ModalService.confirm` already points `aria-labelledby` and `aria-describedby` at the
   * default `modal-title` and `modal-body` ids, so the title and the warning are announced
   * when the dialog opens, and focus starts on "Cancel".
   */
  async closeDashboardDetails() {
    try {
      await this.modal.confirm(
        'Close dashboard details',
        'Are you sure you want to close dashboard details? All unsaved changes will be lost.',
        Status.WARNING,
        { ok: 'Close', cancel: 'Cancel' },
      );
      this.lastConfirmChoice = 'Close';
    } catch {
      this.lastConfirmChoice = 'Cancel';
    }
  }
}
