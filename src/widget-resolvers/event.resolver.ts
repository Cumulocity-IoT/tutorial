import { Injectable } from '@angular/core';
import { EventService } from '@c8y/client';
import { IEvent } from '@c8y/client';
import {
  DynamicComponentAlert,
  DynamicDetailsResolver,
  DynamicResolverService
} from '@c8y/ngx-components';
import { uniq } from 'lodash';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, share, take, tap } from 'rxjs/operators';

/**
 * A DynamicDetailsResolver responsible to resolve a configured event for dynamic components.
 * This service implements bulk resolving. We are sadly not able to query multiple events by
 * id at the same time, so we have to perform a request per id.
 * Still we are able to reduce the number of requests, since events with the same id in one
 * bulk will only be loaded once.
 * The SimpleDynamicEventResolver could be used as an alternative.
 */
@Injectable({ providedIn: 'root' })
export class DynamicEventResolver implements DynamicDetailsResolver<IEvent> {
  protected eventIds = new Map<number, string[]>();
  protected bulkResolve: Observable<{ result: IEvent[]; bulkRequestId: number }>;

  constructor(
    protected dynamicResolver: DynamicResolverService,
    protected events: EventService
  ) {
    this.bulkResolve = this.dynamicResolver.bulkResolvingTrigger$.pipe(
      map(bulkRequestId => ({
        uniqIds: uniq(this.eventIds.get(bulkRequestId) || []),
        bulkRequestId
      })),
      tap(({ bulkRequestId }) => this.eventIds.delete(bulkRequestId)),
      mergeMap(({ uniqIds, bulkRequestId }) => this.loadEvents(uniqIds, bulkRequestId)),
      share()
    );
  }

  resolve(
    config: any,
    attribute: string,
    bulkRequestId: number
  ): IEvent | Promise<IEvent> | Observable<IEvent | DynamicComponentAlert<IEvent>> {
    const storedEvent: IEvent = config[attribute];
    if (!storedEvent) {
      return;
    }

    this.addEventId(bulkRequestId, `${storedEvent.id}`);

    return this.bulkResolve.pipe(
      filter(({ bulkRequestId: requestId }) => bulkRequestId === requestId),
      take(1),
      map(
        ({ result: updatedEvents }) =>
          updatedEvents.find(updatedEvent => updatedEvent.id === storedEvent.id) ||
          new DynamicComponentAlert({
            text: `Unable to retrieve Event "${storedEvent.text}" (${storedEvent.id})`,
            type: 'danger',
            unresolvedData: storedEvent
          })
      )
    );
  }

  serialize(config: any, attribute: string) {
    if (!config[attribute]) {
      return;
    }
    const { text, id } = config[attribute];
    return { text, id };
  }

  protected addEventId(bulkRequestId: number, eventId: string) {
    let eventIdsOfRequest = this.eventIds.get(bulkRequestId);
    if (!eventIdsOfRequest) {
      eventIdsOfRequest = [];
      this.eventIds.set(bulkRequestId, eventIdsOfRequest);
    }
    eventIdsOfRequest.push(eventId);
  }

  protected async loadEvents(eventIds: string[], bulkRequestId: number) {
    const promises = eventIds.map(eventId => this.loadSingleEvent(eventId));
    const result = await Promise.all(promises);
    const filteredResult = result.filter(event => !!event);
    return { result: filteredResult, bulkRequestId };
  }

  protected async loadSingleEvent(eventId: string) {
    try {
      const { data: event } = await this.events.detail(eventId);
      return event;
    } catch {
      return;
    }
  }
}
