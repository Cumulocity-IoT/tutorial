import { Injectable } from '@angular/core';
import { OptionsService, RealtimeMessage, RealtimeSubjectService } from '@c8y/ngx-components';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { getFakeData } from './utils/realtime';
import { Realtime } from '@c8y/client';

/**
 * A mocked implementation of `RealtimeSubjectService` provides observables with emitting fake data every 5 seconds in case the noLogin option is set.
 * In case it is not set, we will use the default functionality of `RealtimeSubjectService`.
 */
@Injectable({ providedIn: 'root' })
export class RealtimeSubjectServiceWithMocking extends RealtimeSubjectService {
  mockingEnabled = false;
  constructor(options: OptionsService, realtime: Realtime) {
    super(realtime);
    this.mockingEnabled = options.get('noLogin', false);
  }

  getObservableForChannel<T>(channel: string): Observable<RealtimeMessage<T>> {
    if (!this.mockingEnabled) {
      return super.getObservableForChannel(channel);
    }

    return this.getMockedData$<T>(channel);
  }

  private getMockedData$<T>(channel: string): Observable<RealtimeMessage<T>> {
    return interval(5000).pipe(map(() => getFakeData<T>(channel)));
  }
}
