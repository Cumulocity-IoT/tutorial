import { Component, inject } from '@angular/core';
import { IconDirective } from '@c8y/ngx-components';
import { DeploymentExampleService } from './deployment-example.service';

/**
 * Emergency action that stops the rollout.
 */
@Component({
  selector: 'tut-deployment-stop-button',
  template: `
    <button class="btn btn-danger btn-sm" type="button" (click)="service.stop()">
      <i [c8yIcon]="'stop'" aria-hidden="true"></i>
      Stop
    </button>
  `,
  imports: [IconDirective],
})
export class DeploymentStopButtonComponent {
  protected readonly service = inject(DeploymentExampleService);
}
