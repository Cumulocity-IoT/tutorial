import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ExtensionFactory, StatusBar } from '@c8y/ngx-components';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import {
  RUN_STATE_BAR,
  RUN_STATE_EXAMPLE_PATH,
  RUN_STATE_THEME,
  RUN_STATUS_LABEL,
} from '../status-bar-example.model';
import { RunStateExampleService } from './run-state-example.service';

/**
 * Contributes the run state bar on the example page, re-themed and relabelled
 * whenever the asset's run state changes.
 */
@Injectable()
export class RunStateStatusBarFactory implements ExtensionFactory<StatusBar> {
  private readonly router = inject(Router);
  private readonly service = inject(RunStateExampleService);

  get(): Observable<StatusBar[]> {
    if (!this.router.url.startsWith(`/${RUN_STATE_EXAMPLE_PATH}`)) {
      return of([]);
    }
    return this.service.status$.pipe(
      distinctUntilChanged(),
      map((status) => [
        {
          id: RUN_STATE_BAR,
          theme: RUN_STATE_THEME[status],
          priority: 100,
          options: {
            icon: 'connected',
            label: RUN_STATUS_LABEL[status],
            message: status === 'offline' ? 'Disconnected' : 'Connected',
          },
        },
      ]),
    );
  }
}
