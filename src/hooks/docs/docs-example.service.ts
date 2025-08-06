import { Injectable } from '@angular/core';
import { DocLink, ExtensionFactory } from '@c8y/ngx-components';
import { Observable, of } from 'rxjs';

@Injectable()
export class DocsExampleService implements ExtensionFactory<DocLink> {
  get(): Observable<DocLink[]> {
    return of([
      {
        icon: 'c8y-icon c8y-icon-mobile-add',
        type: 'doc',
        url: 'https://cumulocity.com',
        label: 'Doc link from service'
      }
    ]);
  }
}
