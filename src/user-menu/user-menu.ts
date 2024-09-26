import { Injectable } from '@angular/core';
import { AlertService, gettext, UserMenuService } from '@c8y/ngx-components';

@Injectable()
export class ExampleUserMenu {
  // Inject the c8y UserMenuService
  constructor(
    private userMenu: UserMenuService,
    private alert: AlertService
  ) {
    // add an item to the user menu
    this.userMenu.add({
      icon: 'notification',
      label: gettext('Notifications'),
      priority: 0,
      click: () => {
        this.onClick();
      }
    });
  }

  // method to be called when button in user menu is clicked
  private onClick() {
    this.alert.info(gettext('Notification button clicked.'));
  }
}
