import { Component, OnDestroy } from '@angular/core';
import { Action, ActionService, CoreModule } from '@c8y/ngx-components';

/**
 * Adds a global action (plus button) via a service.
 */
@Component({
  selector: 'hook-with-service-example',
  templateUrl: `./hook-with-service-example.component.html`,
  standalone: true,
  imports: [CoreModule]
})
export class HookWithServiceExampleComponent implements OnDestroy {
  private action: Action = {
    label: 'Hello from service',
    icon: 'grid',
    action: () => alert('Hello from service')
  };

  constructor(public actionService: ActionService) {}

  addAction() {
    // Add a action via service
    this.actionService.add(this.action);
  }

  removeAction() {
    // You need to remove it, otherwise it stays.
    this.actionService.remove(this.action);
  }

  ngOnDestroy(): void {
    // let's clean up the item if user navigates away
    this.actionService.remove(this.action);
  }
}
