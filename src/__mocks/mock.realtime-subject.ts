import { Injectable } from '@angular/core';
import { RealtimeMessage } from '@c8y/ngx-components';
import { Observable, Subject, Subscription, interval } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { CleanRealtime } from './utils/clean.realtime';
import { Channels } from './mock.model';
import { getFakeData } from './utils/realtime';
import { IManagedObject } from '@c8y/client';

/**
 * Mock service for creating a stream of realtime data for a given channel.
 */
@Injectable({ providedIn: 'root' })
export class MockRealtimeSubject {
  /**
   * The channel for which the realtime data will be mocked.
   */
  private readonly REALTIME_CHANNEL = Channels.ManagedObjects;
  /**
   * The subscription for the interval generating the mocked data.
   */
  private intervalSubscription: Subscription;
  /**
   * The subject emitting the mocked realtime data.
   */
  private realtimeMockedData$: Subject<RealtimeMessage<IManagedObject>>;

  constructor(cleanRealtime: CleanRealtime) {
    cleanRealtime.stop$.pipe(takeUntil(cleanRealtime.onDestroy$)).subscribe(() => this.cleanUp());
    cleanRealtime.onDestroy$.pipe(take(1)).subscribe(() => this.cleanUp());
  }
  /**
   * Returns an observable emitting realtime data for the given channel.
   *
   * @returns The observable of the mocked realtime data.
   */
  getObservableForChannel(): Observable<RealtimeMessage<IManagedObject>> {
    this.realtimeMockedData$ = new Subject<RealtimeMessage<IManagedObject>>();
    this.setInterval(this.realtimeMockedData$);
    return this.realtimeMockedData$;
  }
  /**
   * Sets up an interval for generating and emitting the mocked data.
   *
   * @param realtimeMessageSubject$ - The subject to emit the mocked data.
   */
  private setInterval(realtimeMessageSubject$: Subject<RealtimeMessage<IManagedObject>>) {
    this.intervalSubscription = interval(5000)
      .pipe(map(() => getFakeData<IManagedObject>(this.REALTIME_CHANNEL)))
      .subscribe(data => {
        if (!realtimeMessageSubject$.isStopped) {
          realtimeMessageSubject$.next(data);
        }
      });
  }
  /**
   * Cleans up by completing and unsubscribing the subject and the interval subscription.
   */
  private cleanUp() {
    if (this.realtimeMockedData$) {
      this.realtimeMockedData$.complete();
      this.realtimeMockedData$.unsubscribe();
    }
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
