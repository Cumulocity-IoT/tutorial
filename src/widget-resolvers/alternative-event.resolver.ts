import { Injectable } from '@angular/core';
import { EventService, IEvent } from '@c8y/client';
import { gettext } from '@c8y/ngx-components/gettext';
import { DynamicBulkIIdentifiedResolver, DynamicResolverService } from '@c8y/ngx-components';

/**
 * An short alternative to the DynamicEventResolver class using the abstract class DynamicBulkIIdentifiedResolver.
 */
@Injectable({ providedIn: 'root' })
export class SimpleDynamicEventResolver extends DynamicBulkIIdentifiedResolver<
  IEvent & { id: string | number }
> {
  protected errorMessage = gettext(
    'Unable to retrieve the following event: "{{entityName}}" ({{entityId}}).'
  );

  constructor(
    protected dynamicResolver: DynamicResolverService,
    protected events: EventService
  ) {
    super(dynamicResolver, events as any);
  }
}
