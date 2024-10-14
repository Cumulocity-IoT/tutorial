import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IApplication } from '@c8y/client';
import { AppStateService, CoreModule, PackageType } from '@c8y/ngx-components';
import { SharedEcosystemModule } from '@c8y/ngx-components/ecosystem/shared';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'tut-application-card',
  templateUrl: './application-card-example.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, CoreModule, SharedEcosystemModule],
  providers: [
    {
      provide: AppStateService,
      useValue: { currentTenant: { value: { name: '' } } }
    }
  ]
})
export class ApplicationCardExampleComponent {
  listClass: string;
  apps$: Observable<IApplication[]> = of([
    {
      name: 'cockpit',
      contextPath: 'cockpit',
      key: 'cockpit-application-key',
      label: PackageType.OFFICIAL,
      description: 'This package is used to scaffold a cockpit application for Cumulocity IoT.',
      manifest: { version: '1.0.0', author: 'c8y_dev' }
    },
    {
      name: 'administration',
      contextPath: 'administration',
      key: 'administration-application-key',
      label: PackageType.OFFICIAL,
      description: '',
      manifest: { version: '1.0.0', author: 'c8y_dev' }
    },
    {
      name: 'devicemanagement',
      contextPath: 'devicemanagement',
      key: 'devicemanagement-application-key',
      label: PackageType.OFFICIAL,
      description:
        'This package is used to scaffold a Device Management application for Cumulocity IoT.',
      manifest: { version: '1.0.0', author: 'c8y_dev' }
    }
  ]);

  appDeleted(app: IApplication[]) {
    console.log('App deleted:', app);
  }
  appCloned(app: IApplication[]) {
    console.log('App cloned:', app);
  }
}
