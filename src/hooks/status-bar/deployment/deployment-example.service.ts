import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, EMPTY, interval } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { DeploymentState } from '../status-bar-example.model';

const TICK_MS = 1500;

/**
 * Mock firmware rollout. While active it advances by one percent per tick and
 * completes at 100 %. Nothing is sent to the platform.
 */
@Injectable()
export class DeploymentExampleService {
  readonly campaignName = 'Firmware 4.2.1 rollout';
  readonly totalDevices = 1200;

  private readonly stateSubject = new BehaviorSubject<DeploymentState>({
    status: 'paused',
    progress: 72,
  });
  readonly state$ = this.stateSubject.asObservable();

  private started = false;

  constructor() {
    this.state$
      .pipe(
        map((state) => state.status === 'active'),
        distinctUntilChanged(),
        switchMap((active) => (active ? interval(TICK_MS) : EMPTY)),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.advance());
  }

  /**
   * Starts the rollout the first time the example page opens.
   */
  start(): void {
    if (!this.started) {
      this.started = true;
      this.resume();
    }
  }

  pause(): void {
    this.setStatus('paused');
  }

  resume(): void {
    this.setStatus('active');
  }

  stop(): void {
    this.setStatus('stopped');
  }

  restart(): void {
    this.stateSubject.next({ status: 'active', progress: 0 });
  }

  private setStatus(status: DeploymentState['status']): void {
    this.stateSubject.next({ ...this.stateSubject.value, status });
  }

  private advance(): void {
    const progress = Math.min(this.stateSubject.value.progress + 1, 100);
    this.stateSubject.next({ status: progress === 100 ? 'completed' : 'active', progress });
  }
}
