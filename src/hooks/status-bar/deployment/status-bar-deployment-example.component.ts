import { Component } from '@angular/core';
import { TitleComponent } from '@c8y/ngx-components';

/**
 * Example page for the rollout status bar. The bar itself is contributed by the
 * hooks in `StatusBarDeploymentExampleModule`.
 */
@Component({
  selector: 'tut-status-bar-deployment-example',
  templateUrl: './status-bar-deployment-example.component.html',
  imports: [TitleComponent],
})
export class StatusBarDeploymentExampleComponent {}
