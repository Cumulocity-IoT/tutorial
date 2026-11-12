import { NgModule } from '@angular/core';
import {
  NavigatorNode,
  hookNavigator,
  hookRoute,
  hookStatusBar,
  hookStatusBarItem,
} from '@c8y/ngx-components';
import { RUN_STATE_BAR, RUN_STATE_EXAMPLE_PATH } from '../status-bar-example.model';
import {
  RestartAssetButtonComponent,
  ServiceRequestButtonComponent,
} from './run-state-actions.component';
import { RunStateExampleService } from './run-state-example.service';
import { RunStateStatusBarFactory } from './run-state-status-bar.factory';
import { RunStateStatusComponent } from './run-state-status.component';

@NgModule({
  providers: [
    RunStateExampleService,
    hookRoute({
      path: RUN_STATE_EXAMPLE_PATH,
      loadComponent: () =>
        import('./status-bar-run-state-example.component').then(
          (m) => m.StatusBarRunStateExampleComponent,
        ),
    }),
    hookNavigator(
      new NavigatorNode({
        path: RUN_STATE_EXAMPLE_PATH,
        label: 'Run state',
        icon: 'connected',
        parent: 'Status bar',
      }),
    ),
    // important
    hookStatusBar(RunStateStatusBarFactory),
    hookStatusBarItem([
      {
        statusBarId: RUN_STATE_BAR,
        placement: 'left',
        priority: 100,
        component: RunStateStatusComponent,
      },
      {
        statusBarId: RUN_STATE_BAR,
        placement: 'right',
        priority: 20,
        component: RestartAssetButtonComponent,
      },
      {
        statusBarId: RUN_STATE_BAR,
        placement: 'right',
        priority: 10,
        component: ServiceRequestButtonComponent,
      },
    ]),
    // /important
  ],
})
export class StatusBarRunStateExampleModule {}
