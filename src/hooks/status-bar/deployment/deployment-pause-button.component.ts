import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IconDirective } from '@c8y/ngx-components';
import { map } from 'rxjs/operators';
import { DeploymentExampleService } from './deployment-example.service';

/**
 * Pauses an active rollout, resumes a paused one and restarts an ended one.
 */
@Component({
  selector: 'tut-deployment-pause-button',
  template: `
    @switch (status$ | async) {
      @case ('active') {
        <button class="btn btn-default btn-sm" type="button" (click)="service.pause()">
          <i [c8yIcon]="'pause'" aria-hidden="true"></i>
          Pause
        </button>
      }
      @case ('paused') {
        <button class="btn btn-default btn-sm" type="button" (click)="service.resume()">
          <i [c8yIcon]="'play'" aria-hidden="true"></i>
          Resume
        </button>
      }
      @default {
        <button class="btn btn-default btn-sm" type="button" (click)="service.restart()">
          <i [c8yIcon]="'repeat'" aria-hidden="true"></i>
          Restart
        </button>
      }
    }
  `,
  imports: [AsyncPipe, IconDirective],
})
export class DeploymentPauseButtonComponent {
  protected readonly service = inject(DeploymentExampleService);
  protected readonly status$ = this.service.state$.pipe(map((state) => state.status));
}
