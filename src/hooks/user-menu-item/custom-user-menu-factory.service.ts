import { Injectable } from '@angular/core';
import { ExtensionFactory, UserMenuItem } from '@c8y/ngx-components';
import { Observable, of } from 'rxjs';

@Injectable()
export class CustomUserMenuFactory implements ExtensionFactory<UserMenuItem> {
  protected userMenuItem: UserMenuItem = {
    icon: 'user',
    label: 'Example',
    click: () => console.log('I am the first example'),
    priority: 100
  };

  /**
   * The Item will be shown in the right drawer user menu.
   * @description Returns the user menu item. The returned menu item could be a Promise, Observable, or a static object.
   * @returns The user menu item.
   */
  get(): Observable<UserMenuItem> {
    return of(this.userMenuItem);
  }
}
