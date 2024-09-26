import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action, ActionFactory } from '@c8y/ngx-components';
import { get } from 'lodash-es';
import { LogoutActionComponent } from './logout-action/logout-action.component';

/**
 * Actions are available through a button (+) within the header.
 * The actions button is always visible within the header.
 */
@Injectable()
export class ExampleActionFactory implements ActionFactory {
  // Implement the get()-method, otherwise the ExampleActionFactory
  // implements the ActionFactory interface incorrectly (!)
  get(activatedRoute?: ActivatedRoute) {
    // You can have more than one action
    // The actions button is rendered as a dropdown of buttons
    const actions: Action[] = [];

    const isActionNode: boolean = get(activatedRoute, 'snapshot.url[1].path') === 'action';

    if (isActionNode) {
      // Mandatory for an Action is just a label (string)
      const someDeviceAction: Action = {
        label: 'Custom action',
        action: () => console.log('Custom action is triggered.'),
        disabled: true,
        priority: 1
      };

      const customLogoutButton: Action = {
        component: LogoutActionComponent
      };

      actions.push(someDeviceAction);
      actions.push(customLogoutButton);
    }

    return actions;
  }
}
