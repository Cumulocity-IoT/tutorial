import { Injectable } from '@angular/core';
import { EventService } from '@c8y/client';
import { IEvent } from '@c8y/client';
import { DynamicBulkIIdentifiedResolver, DynamicResolverService } from '@c8y/ngx-components';

/**
 * An short alternative to the DynamicEventResolver class using the abstract class DynamicBulkIIdentifiedResolver.
 */
@Injectable({ providedIn: 'root' })
export class SimpleDynamicEventResolver extends DynamicBulkIIdentifiedResolver<
  IEvent & { id: string | number }
> {
  protected typeForErrorMessage = 'event';

  constructor(
    protected dynamicResolver: DynamicResolverService,
    protected events: EventService
  ) {
    super(dynamicResolver, events as any);
  }
}
