import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AlarmRealtimeService,
  CoreModule,
  EventRealtimeService,
  ManagedObjectRealtimeService,
  MeasurementRealtimeService,
  OperationBulkRealtimeService,
  OperationRealtimeService,
  RealtimeMessage
} from '@c8y/ngx-components';
import { Observable, merge } from 'rxjs';
import { map, scan } from 'rxjs/operators';

@Component({
  selector: 'tut-realtime-button',
  templateUrl: './realtime-tutorial.component.html',
  providers: [
    ManagedObjectRealtimeService,
    OperationRealtimeService,
    OperationBulkRealtimeService,
    MeasurementRealtimeService,
    AlarmRealtimeService,
    EventRealtimeService
  ],
  standalone: true,
  imports: [CommonModule, CoreModule]
})
export class RealtimeTutorialComponent {
  allAPIsRealtime$: ReturnType<RealtimeTutorialComponent['setupAllAPIsRealtime$']>;
  services: ReturnType<RealtimeTutorialComponent['setupServices']>;
  bufferSize = 10;
  bufferSizeOptions = [1, 5, 10, 25, 50, 100];

  constructor() {
    this.services = this.setupServices();
    this.allAPIsRealtime$ = this.setupAllAPIsRealtime$();

    // disable every service except the first one
    this.services.forEach((service, index) => {
      if (index) {
        service.instance.stop();
      }
    });
  }

  private setupAllAPIsRealtime$(): Observable<RealtimeMessage<any>[]> {
    /**
     * Always subscribing for all realtime notifications might generate a lot of traffic/load.
     * For that reason try to provide your entityId where ever it is possible in your production code.
     */
    const observables = this.services.map(service => service.instance.onAll$());
    return merge(...observables).pipe(
      scan((acc, val) => {
        acc.push(val);
        return acc.slice(this.bufferSize * -1);
      }, []),
      map(messages => [...messages].reverse())
    );
  }

  private setupServices() {
    return [
      {
        className: 'ManagedObjectRealtimeService',
        instance: inject(ManagedObjectRealtimeService)
      },
      {
        className: 'OperationRealtimeService',
        instance: inject(OperationRealtimeService)
      },
      {
        className: 'OperationBulkRealtimeService',
        instance: inject(OperationBulkRealtimeService)
      },
      {
        className: 'MeasurementRealtimeService',
        instance: inject(MeasurementRealtimeService)
      },
      {
        className: 'AlarmRealtimeService',
        instance: inject(AlarmRealtimeService)
      },
      {
        className: 'EventRealtimeService',
        instance: inject(EventRealtimeService)
      }
    ];
  }
}
