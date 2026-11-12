import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TitleComponent } from '@c8y/ngx-components';
import { RUN_STATUS_LABEL, RunStatus } from '../status-bar-example.model';
import { RunStateExampleService } from '../run-state/run-state-example.service';

/**
 * Example page for a status bar built entirely from custom components, without
 * the `options` guardrail. The bar is contributed by the hooks in
 * `StatusBarCustomExampleModule`.
 */
@Component({
  selector: 'tut-status-bar-custom-example',
  templateUrl: './status-bar-custom-example.component.html',
  imports: [AsyncPipe, TitleComponent],
})
export class StatusBarCustomExampleComponent {
  protected readonly service = inject(RunStateExampleService);
  protected readonly statuses: RunStatus[] = ['running', 'idle', 'offline'];
  protected readonly labels = RUN_STATUS_LABEL;
}
