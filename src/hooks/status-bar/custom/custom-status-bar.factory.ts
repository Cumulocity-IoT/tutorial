import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ExtensionFactory, StatusBar } from '@c8y/ngx-components';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { CUSTOM_BAR, CUSTOM_EXAMPLE_PATH, RUN_STATE_THEME } from '../status-bar-example.model';
import { RunStateExampleService } from '../run-state/run-state-example.service';

/**
 * Contributes a bar WITHOUT the `options` guardrail: no `icon` or `label` is set,
 * so the outlet renders no built-in icon or caption. The whole left state is
 * built by a custom component instead (see `CustomBarStatusComponent`). Only the
 * theme (background, accent, status icon color) still comes from the bar.
 */
@Injectable()
export class CustomStatusBarFactory implements ExtensionFactory<StatusBar> {
  private readonly router = inject(Router);
  private readonly service = inject(RunStateExampleService);

  get(): Observable<StatusBar[]> {
    if (!this.router.url.startsWith(`/${CUSTOM_EXAMPLE_PATH}`)) {
      return of([]);
    }
    return this.service.status$.pipe(
      distinctUntilChanged(),
      map((status) => [{ id: CUSTOM_BAR, theme: RUN_STATE_THEME[status], priority: 100 }]),
    );
  }
}
