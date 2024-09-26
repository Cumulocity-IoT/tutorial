import { Component } from '@angular/core';
import {
  CommonModule,
  gettext,
  HeaderModule,
  ModalModule,
  PopoverConfirmButtons,
  PopoverConfirmComponent
} from '@c8y/ngx-components';

@Component({
  selector: 'pop-confirm-example',
  template: `<c8y-title>Popover confirm</c8y-title>
    <div class="p-24">
      <button
        class="btn btn-dot btn-dot--danger m-l-auto"
        title="{{ 'Delete' | translate }}"
        type="button"
        (click)="triggerPopover(poConfirm)"
      >
        <i c8yIcon="minus-circle"></i>
      </button>
      <c8y-popover-confirm
        [title]="'Delete item' | translate"
        [placement]="'right'"
        [outsideClick]="true"
        #poConfirm
      ></c8y-popover-confirm>
    </div>`,
  standalone: true,
  imports: [ModalModule, CommonModule, HeaderModule]
})
export class PopConfirmExampleComponent {
  // you can provide custom buttons
  confirmRemoveColumnButtons: PopoverConfirmButtons[] = [
    {
      label: gettext('Cancel'),
      action: () => Promise.resolve(false)
    },
    {
      label: gettext('Delete'),
      status: 'danger',
      action: () => Promise.resolve(true)
    }
  ];

  async triggerPopover(poConfirm: PopoverConfirmComponent): Promise<void> {
    // to set the message
    poConfirm.message = gettext('This action is irreversible.');
    try {
      const remove = await poConfirm.show(this.confirmRemoveColumnButtons);
      if (!remove) {
        // eslint-disable-next-line no-console
        console.log('You clicked "Cancel"!');
        return;
      }
      // eslint-disable-next-line no-console
      console.log('You successfully deleted the item!');
    } catch (e) {
      // do nothing or display "deletion failed" message
    }
  }
}
