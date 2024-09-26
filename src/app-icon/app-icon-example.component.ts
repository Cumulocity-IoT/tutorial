import { Component } from '@angular/core';
import { IApplication } from '@c8y/client';
import { CoreModule } from '@c8y/ngx-components';
@Component({
  selector: 'tut-app-icon-example',
  templateUrl: './app-icon-example.component.html',
  standalone: true,
  imports: [CoreModule]
})
export class AppIconExampleComponents {
  appExample1: IApplication = {
    name: 'Chat',
    contextPath: 'chat'
  };
  appExample2: IApplication = {
    name: 'Fleet Manager',
    contextPath: 'fleetmanager'
  };

  customApp1: IApplication = {
    name: 'Digital Twin Manager',
    contextPath: 'dtm',
    icon: { class: 'c8y-icon-enterprise' }
  };
  customApp2: IApplication = {
    name: 'DataHub',
    contextPath: 'datahub',
    icon: { class: 'c8y-icon-data-hub ' }
  };
  customApp3: IApplication = {
    name: 'OEE',
    contextPath: 'oee',
    icon: { class: 'c8y-icon-oee' }
  };

  defaultApp1: IApplication = {
    name: 'Cockpit',
    contextPath: 'cockpit'
  };
  defaultApp2: IApplication = {
    name: 'Device Management',
    contextPath: 'devicemanagement'
  };
  defaultApp3: IApplication = {
    name: 'Administration',
    contextPath: 'administration'
  };
  defaultApp4: IApplication = {
    name: 'Analytics Builder',
    contextPath: 'analyticsbuilder'
  };
  defaultApp5: IApplication = {
    name: 'Apama EPL',
    contextPath: 'apamaepl'
  };
}
