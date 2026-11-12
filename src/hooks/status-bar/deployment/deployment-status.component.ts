import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { DeploymentExampleService } from './deployment-example.service';

/**
 * Left content of the rollout bar: a mini progress bar and the device count.
 * The campaign name and status come from the bar's `options` (message and
 * label). On small screens the device count hides and the progress bar shrinks.
 */
@Component({
  selector: 'tut-deployment-status',
  host: { class: 'd-block min-width-0' },
  template: `
    @let vm = vm$ | async;
    @if (vm) {
      <span class="d-flex a-i-center gap-8">
        <!-- Updates every tick: keep it out of the bar's live region announcements. -->
        <span class="tut-deployment-status__progress progress flex-no-shrink" aria-live="off">
          <span
            class="progress-bar"
            [class.progress-bar-striped]="vm.active"
            [class.active]="vm.active"
            [style.width.%]="vm.progress"
            aria-label="Deployment progress"
            aria-valuemin="0"
            aria-valuemax="100"
            [attr.aria-valuenow]="vm.progress"
            role="progressbar"
          ></span>
        </span>
        <span class="text-nowrap hidden-xs" aria-live="off">
          {{ vm.progress }} % · {{ vm.done }} of {{ totalDevices }} devices
        </span>
      </span>
    }
  `,
  styles: `
    .tut-deployment-status__progress {
      margin: 0;
      width: 120px;
      height: 8px;
    }
    @media (max-width: 767px) {
      .tut-deployment-status__progress {
        width: 48px;
      }
    }
  `,
  imports: [AsyncPipe],
})
export class DeploymentStatusComponent {
  private readonly service = inject(DeploymentExampleService);

  protected readonly totalDevices = this.service.totalDevices;

  protected readonly vm$ = this.service.state$.pipe(
    map(({ status, progress }) => ({
      active: status === 'active',
      progress,
      done: Math.round((progress / 100) * this.totalDevices),
    })),
  );
}
