import { NgModule } from '@angular/core';
import {
  NavigatorNode,
  hookNavigator,
  hookRoute,
  hookStatusBar,
  hookStatusBarItem,
} from '@c8y/ngx-components';
import { DEPLOYMENT_BAR, DEPLOYMENT_EXAMPLE_PATH } from '../status-bar-example.model';
import { DeploymentExampleService } from './deployment-example.service';
import { DeploymentPauseButtonComponent } from './deployment-pause-button.component';
import {
  DeploymentStatusBarFactory,
  DeploymentStopItemFactory,
} from './deployment-status-bar.factory';
import { DeploymentStatusComponent } from './deployment-status.component';

@NgModule({
  providers: [
    DeploymentExampleService,
    hookRoute({
      path: DEPLOYMENT_EXAMPLE_PATH,
      loadComponent: () =>
        import('./status-bar-deployment-example.component').then(
          (m) => m.StatusBarDeploymentExampleComponent,
        ),
    }),
    hookNavigator(
      new NavigatorNode({
        path: DEPLOYMENT_EXAMPLE_PATH,
        label: 'Rollout',
        icon: 'c8y-firmware',
        parent: 'Status bar',
      }),
    ),
    // important
    hookStatusBar(DeploymentStatusBarFactory),
    hookStatusBarItem([
      {
        statusBarId: DEPLOYMENT_BAR,
        placement: 'left',
        priority: 100,
        component: DeploymentStatusComponent,
      },
      {
        statusBarId: DEPLOYMENT_BAR,
        placement: 'right',
        priority: 20,
        component: DeploymentPauseButtonComponent,
      },
    ]),
    hookStatusBarItem(DeploymentStopItemFactory),
    // /important
  ],
})
export class StatusBarDeploymentExampleModule {}
