import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionBarFactory, ActionBarItem } from '@c8y/ngx-components';
import { get } from 'lodash-es';
import { RefreshActionComponent } from './refresh-element/refresh-element.component';

/**
 * This actions bar button is only visible at 'action-bar' path.
 */
@Injectable()
export class ExampleActionBarFactory implements ActionBarFactory {
  get(activatedRoute?: ActivatedRoute) {
    const actions: ActionBarItem[] = [];

    const isActionBarNode: boolean = get(activatedRoute, 'snapshot.url[1].path') === 'action-bar';

    if (isActionBarNode) {
      actions.push({
        priority: 500,
        // If the element is enclosed withing "c8y-action-bar-item" then placement refers to this element.
        placement: 'right',
        component: RefreshActionComponent
      });
    }

    return actions;
  }
}
