import { Injectable } from '@angular/core';
import { ExtensionFactory, Version } from '@c8y/ngx-components';
import { Observable } from 'rxjs';

@Injectable()
export class CustomVersionFactory implements ExtensionFactory<Version> {
  versions: Version[] = [
    /**
     * Will be shown in right drawer on the top.
     * NOTE: only the first two entries with the highest priority are shown in the right drawer.
     */
    {
      label: 'Custom',
      type: 'someCustomType',
      version: '0.0.1',
      priority: 100,
      // Is not going to be shown in the UI, but will be part of the JSON that can be copied to clipboard and e.g. sent to support.
      custom: {
        myDetails: 'Some details specific to this version'
      }
    },
    /**
     * Will not be shown in right drawer as `hideInRightDrawer` is set.
     * But will show up in modal dialog.
     */
    {
      label: 'Custom-2',
      type: 'someCustomType',
      version: '0.0.2',
      priority: 99,
      hidden: false
    },
    /**
     * Will not be shown in the UI as `hidden` is set.
     * But will be part of the JSON that can be copied to clipboard.
     */
    {
      label: 'Custom-3',
      type: 'someCustomType',
      version: '0.0.3',
      priority: 98,
      hidden: true
    }
  ];

  get(): Version | Version[] | Observable<Version | Version[]> | Promise<Version | Version[]> {
    return this.versions;
  }
}
