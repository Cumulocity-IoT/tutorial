import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertService } from '@c8y/ngx-components';
import { BehaviorSubject, timer } from 'rxjs';
import { RunStatus } from '../status-bar-example.model';

const RESTART_MS = 3000;

/**
 * Mock asset run state. Restarting takes a few seconds and returns to
 * running. Nothing is sent to the platform.
 */
@Injectable()
export class RunStateExampleService {
  private readonly alert = inject(AlertService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly statusSubject = new BehaviorSubject<RunStatus>('running');
  readonly status$ = this.statusSubject.asObservable();

  setStatus(status: RunStatus): void {
    this.statusSubject.next(status);
  }

  restart(): void {
    this.statusSubject.next('restarting');
    timer(RESTART_MS)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        // The state may have changed meanwhile (e.g. set to offline).
        if (this.statusSubject.value === 'restarting') {
          this.statusSubject.next('running');
        }
      });
  }

  createServiceRequest(): void {
    this.alert.success('Service request created.');
  }

  downloadDiagnostics(): void {
    this.alert.success('Diagnostics download started.');
  }
}
