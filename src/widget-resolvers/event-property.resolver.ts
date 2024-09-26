import { Injectable } from '@angular/core';
import { IManagedObject } from '@c8y/client';
import {
  DynamicComponentAlert,
  DynamicDetailsResolver,
  DynamicManagedObjectResolver
} from '@c8y/ngx-components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * A DynamicDetailsResolver responsible to resolve configured datapoints for dynamic components.
 * This service implements bulk resolving and uses the DynamicManagedObjectResolver in the background.
 * It will retrieve the latest version of a properties library entry.
 */
@Injectable({ providedIn: 'root' })
export class PropertiesLibraryResolver implements DynamicDetailsResolver<IManagedObject> {
  constructor(protected moResolver: DynamicManagedObjectResolver) {}

  resolve(
    config: any,
    attribute: string,
    bulkRequestId: number
  ):
    | IManagedObject
    | Promise<IManagedObject>
    | Observable<IManagedObject | DynamicComponentAlert<IManagedObject>> {
    const storedProperty: IManagedObject = config[attribute];
    if (!storedProperty) {
      return;
    }

    this.moResolver.addIdsToBeLoaded(bulkRequestId, storedProperty.id);
    return this.moResolver
      .getResult$(bulkRequestId)
      .pipe(
        map(
          ({ result: updatedMos, errors }) =>
            updatedMos.find(updatedMo => updatedMo.id === storedProperty.id) ||
            this.moResolver.buildRetrievalAlert(storedProperty, errors)
        )
      );
  }

  serialize(config: any, attribute: string) {
    if (!config[attribute]) {
      return;
    }
    const { name, id } = config[attribute];
    return { name, id };
  }
}
