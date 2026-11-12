import { NgModule } from '@angular/core';
import {
  NavigatorNode,
  hookNavigator,
  hookRoute,
  hookStatusBar,
  hookStatusBarItem,
} from '@c8y/ngx-components';
import { CUSTOM_BAR, CUSTOM_EXAMPLE_PATH } from '../status-bar-example.model';
import { RestartAssetButtonComponent } from '../run-state/run-state-actions.component';
import { RunStateExampleService } from '../run-state/run-state-example.service';
import { CustomBarStatusComponent } from './custom-bar-status.component';
import { CustomStatusBarFactory } from './custom-status-bar.factory';
import { DiagnosticsMenuItemComponent } from './diagnostics-menu-item.component';
import { ServiceRequestMenuItemComponent } from './service-request-menu-item.component';

@NgModule({
  providers: [
    RunStateExampleService,
    hookRoute({
      path: CUSTOM_EXAMPLE_PATH,
      loadComponent: () =>
        import('./status-bar-custom-example.component').then(
          (m) => m.StatusBarCustomExampleComponent,
        ),
    }),
    hookNavigator(
      new NavigatorNode({
        path: CUSTOM_EXAMPLE_PATH,
        label: 'Custom bar',
        icon: 'code',
        parent: 'Status bar',
      }),
    ),
    // important
    hookStatusBar(CustomStatusBarFactory),
    hookStatusBarItem([
      {
        statusBarId: CUSTOM_BAR,
        placement: 'left',
        priority: 100,
        component: CustomBarStatusComponent,
      },
      {
        statusBarId: CUSTOM_BAR,
        placement: 'right',
        priority: 20,
        component: RestartAssetButtonComponent,
      },
      {
        statusBarId: CUSTOM_BAR,
        placement: 'more',
        priority: 10,
        component: ServiceRequestMenuItemComponent,
      },
      {
        statusBarId: CUSTOM_BAR,
        placement: 'more',
        priority: 5,
        component: DiagnosticsMenuItemComponent,
      },
    ]),
    // /important
  ],
})
export class StatusBarCustomExampleModule {}
