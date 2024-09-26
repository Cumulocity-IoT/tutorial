import { Injectable } from '@angular/core';
import { IFetchOptions, IFetchResponse, IManagedObject } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { Observable } from 'rxjs';
import { get, set } from 'lodash-es';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClientInterceptorService implements HttpInterceptor {
  private headerPath = 'options.headers';

  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    this.addACustomHeaderToAllRequests(req);
    this.adjustAllNewManagedObjects(req);
    return next
      .handle(req)
      .pipe(switchMap(response => this.modifyResponseBodyForManagedObjects(response)));
  }

  private async modifyResponseBodyForManagedObjects(
    response: IFetchResponse
  ): Promise<IFetchResponse> {
    if (
      !response ||
      !response.ok ||
      (!response.url.endsWith('inventory/managedObjects') &&
        !response.url.includes('inventory/managedObjects?'))
    ) {
      return response;
    }
    const body = await response.json();
    if (body?.managedObjects && Array.isArray(body.managedObjects)) {
      const managedObjects: IManagedObject[] = body.managedObjects;
      managedObjects.forEach(managedObject => {
        managedObject['c8y_ReadByTutorialAppInterceptor'] = {};
      });
    }
    response.json = () => Promise.resolve(body);
    return response;
  }

  private addACustomHeaderToAllRequests(req: ApiCall): void {
    const headers: IFetchOptions['headers'] = get(req, this.headerPath, {});
    headers['TutorialAppInterceptorHeader'] = 'InterceptorValue';
    set(req, this.headerPath, headers);
  }

  private adjustAllNewManagedObjects(req: ApiCall): void {
    const { url, method } = req;
    if (method !== 'POST' || !url.includes('inventory/managedObjects')) {
      return;
    }

    const { body } = req.options;

    const managedObject: Partial<IManagedObject> = JSON.parse(body as string);
    managedObject['c8y_CreatedByTutorialApp'] = {};

    req.options.body = JSON.stringify(managedObject);
  }
}
