import { EnvironmentProviders, Provider, inject, provideAppInitializer } from '@angular/core';
import { gettext } from '@c8y/ngx-components/gettext';
import { AlertService, UserMenuService } from '@c8y/ngx-components';

export function provideUserMenuSample() {
  return [
    provideAppInitializer(() => {
      const initializerFn = ((userMenu: UserMenuService, alert: AlertService) => {
        return () => {
          userMenu.add({
            icon: 'notification',
            label: gettext('Notifications'),
            priority: 0,
            // method to be called when button in user menu is clicked
            click: () => {
              alert.info(gettext('Notification button clicked.'));
            }
          });
        };
      })(inject(UserMenuService), inject(AlertService));
      return initializerFn();
    })
  ] satisfies (Provider | EnvironmentProviders)[];
}
