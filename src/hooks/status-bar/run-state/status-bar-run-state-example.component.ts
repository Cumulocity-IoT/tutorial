import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TitleComponent } from '@c8y/ngx-components';
import { RUN_STATUS_LABEL, RunStatus } from '../status-bar-example.model';
import { RunStateExampleService } from './run-state-example.service';

/**
 * Example page for the run state status bar, with controls to switch the mock
 * asset between states. The bar itself is contributed by the hooks in
 * `StatusBarRunStateExampleModule`.
 */
@Component({
  selector: 'tut-status-bar-run-state-example',
  templateUrl: './status-bar-run-state-example.component.html',
  imports: [AsyncPipe, TitleComponent],
})
export class StatusBarRunStateExampleComponent {
  protected readonly service = inject(RunStateExampleService);
  protected readonly statuses: RunStatus[] = ['running', 'idle', 'offline'];
  protected readonly labels = RUN_STATUS_LABEL;
}
