import { Injectable, Injector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ExtensionFactory, StatusBar, StatusBarItem } from '@c8y/ngx-components';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import {
  DEPLOYMENT_BAR,
  DEPLOYMENT_EXAMPLE_PATH,
  DEPLOYMENT_STATUS_LABEL,
  DEPLOYMENT_THEME,
} from '../status-bar-example.model';
import { DeploymentExampleService } from './deployment-example.service';
import { DeploymentStopButtonComponent } from './deployment-stop-button.component';

/**
 * Contributes the rollout bar on the example page. The returned `Observable`
 * re-themes the bar and updates its label whenever the rollout state changes.
 */
@Injectable()
export class DeploymentStatusBarFactory implements ExtensionFactory<StatusBar> {
  private readonly router = inject(Router);
  private readonly service = inject(DeploymentExampleService);

  get(): Observable<StatusBar[]> {
    if (!this.router.url.startsWith(`/${DEPLOYMENT_EXAMPLE_PATH}`)) {
      return of([]);
    }
    this.service.start();
    return this.service.state$.pipe(
      map(({ status }) => status),
      distinctUntilChanged(),
      map((status) => [
        {
          id: DEPLOYMENT_BAR,
          theme: DEPLOYMENT_THEME[status],
          priority: 100,
          options: {
            icon: 'c8y-firmware',
            label: DEPLOYMENT_STATUS_LABEL[status],
            message: this.service.campaignName,
          },
        },
      ]),
    );
  }
}

/**
 * Contributes the Stop action only while the rollout is active or paused.
 */
@Injectable()
export class DeploymentStopItemFactory implements ExtensionFactory<StatusBarItem> {
  private readonly service = inject(DeploymentExampleService);

  /**
   * The emergency stop stays inline on the right. Items returned from a factory
   * don't get the module's injector automatically, so it is set here: the
   * button injects a service provided by this module.
   */
  private readonly stopItem: StatusBarItem = {
    statusBarId: DEPLOYMENT_BAR,
    placement: 'right',
    priority: 10,
    component: DeploymentStopButtonComponent,
    injector: inject(Injector),
  };

  get(): Observable<StatusBarItem[]> {
    return this.service.state$.pipe(
      map(({ status }) => status === 'active' || status === 'paused'),
      distinctUntilChanged(),
      map((canStop) => (canStop ? [this.stopItem] : [])),
    );
  }
}
