import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IconDirective } from '@c8y/ngx-components';
import { map } from 'rxjs/operators';
import { RunStateExampleService } from './run-state-example.service';

/**
 * Restarts the asset. Disabled while restarting or offline.
 */
@Component({
  selector: 'tut-restart-asset-button',
  template: `
    <button
      class="btn btn-default btn-sm"
      type="button"
      [disabled]="(canRestart$ | async) === false"
      (click)="service.restart()"
    >
      <i [c8yIcon]="'refresh'" aria-hidden="true"></i>
      Restart
    </button>
  `,
  imports: [AsyncPipe, IconDirective],
})
export class RestartAssetButtonComponent {
  protected readonly service = inject(RunStateExampleService);
  protected readonly canRestart$ = this.service.status$.pipe(
    map((status) => status === 'running' || status === 'idle'),
  );
}

/**
 * Creates a (mock) service request for the asset. Below the small breakpoint only
 * the icon shows, so the bar's state label keeps its space.
 */
@Component({
  selector: 'tut-service-request-button',
  template: `
    <button
      class="btn btn-default btn-sm"
      aria-label="Create service request"
      type="button"
      (click)="service.createServiceRequest()"
    >
      <i [c8yIcon]="'wrench'" aria-hidden="true"></i>
      <span class="hidden-xs">Create service request</span>
    </button>
  `,
  imports: [IconDirective],
})
export class ServiceRequestButtonComponent {
  protected readonly service = inject(RunStateExampleService);
}
