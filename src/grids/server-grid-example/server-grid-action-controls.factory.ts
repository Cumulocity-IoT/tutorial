import { Injectable } from '@angular/core';
import { ActionControlFactory, ActionControlHook, AppStateService } from '@c8y/ngx-components';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActionControlsFactory implements ActionControlFactory {
  constructor(private appState: AppStateService) {}

  get():
    | ActionControlHook
    | ActionControlHook[]
    | Observable<ActionControlHook | ActionControlHook[]>
    | Promise<ActionControlHook | ActionControlHook[]> {
    return {
      actionControls: {
        text: 'Factory',
        callback: () => alert('factory'),
        type: 'factory',
        icon: 'factory',
        priority: -10
      },
      matchesGrid: () => {
        return this.appState.currentApplication.value.contextPath === 'tutorial';
      }
    };
  }
}
