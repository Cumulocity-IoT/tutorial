import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { RunStateExampleService } from './run-state-example.service';

/**
 * Left content of the run state bar: the uptime. The connection and status come
 * from the bar's `options` (message and label).
 */
@Component({
  selector: 'tut-run-state-status',
  host: { class: 'd-block min-width-0' },
  template: `
    @if (online$ | async) {
      <span class="text-nowrap hidden-xs">Uptime 14 h 32 min</span>
    }
  `,
  imports: [AsyncPipe],
})
export class RunStateStatusComponent {
  private readonly service = inject(RunStateExampleService);

  protected readonly online$ = this.service.status$.pipe(map((status) => status !== 'offline'));
}
