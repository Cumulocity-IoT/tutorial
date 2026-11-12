import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IconDirective } from '@c8y/ngx-components';
import { map } from 'rxjs/operators';
import { RUN_STATUS_LABEL } from '../status-bar-example.model';
import { RunStateExampleService } from '../run-state/run-state-example.service';

/**
 * Left content of the custom bar. The bar is registered without `options`, so the status
 * bar draws no icon, label or message of its own. This component draws them instead: a
 * connection icon, the run state as the label, and below it whether the asset is connected.
 */
@Component({
  selector: 'tut-custom-bar-status',
  host: { class: 'd-flex a-i-center gap-8 min-width-0' },
  template: `
    @let vm = vm$ | async;
    @if (vm) {
      <i [c8yIcon]="'connected'" aria-hidden="true"></i>
      <span class="d-flex d-col min-width-0">
        <span class="text-label-small l-h-1 text-medium">{{ vm.label }}</span>
        <span class="text-truncate">{{ vm.connection }}</span>
      </span>
    }
  `,
  imports: [AsyncPipe, IconDirective],
})
export class CustomBarStatusComponent {
  private readonly service = inject(RunStateExampleService);

  protected readonly vm$ = this.service.status$.pipe(
    map((status) => ({
      label: RUN_STATUS_LABEL[status],
      connection: status === 'offline' ? 'Disconnected' : 'Connected',
    })),
  );
}
