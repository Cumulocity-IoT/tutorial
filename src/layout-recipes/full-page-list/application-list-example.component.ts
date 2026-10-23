import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ApplicationType } from '@c8y/client';
import { gettext } from '@c8y/ngx-components/gettext';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import {
  ActionBarItemComponent,
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  HelpComponent,
  IconDirective,
  ListDisplaySwitchComponent,
  TitleComponent,
  C8yTranslatePipe,
} from '@c8y/ngx-components';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

interface App {
  id: number;
  name: string;
  type: ApplicationType;
  /** False for applications provided by the parent tenant. */
  owner: boolean;
  description: string;
  contextPath: string;
  icon: string;
}

/** The same labels and classes as APP_STATE in the Ecosystem module. */
const APP_STATE = {
  SUBSCRIBED: { label: gettext('Subscribed`application`'), class: 'label-primary' },
  CUSTOM: { label: gettext('Custom`application`'), class: 'label-info' },
  EXTERNAL: { label: gettext('External`application`'), class: 'label-warning' },
};

@Component({
  selector: 'c8y-application-list-example',
  templateUrl: './application-list-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TitleComponent,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    HelpComponent,
    ActionBarItemComponent,
    ListDisplaySwitchComponent,
    IconDirective,
    BsDropdownModule,
    CdkTrapFocus,
    C8yTranslatePipe,
  ],
})
export class ApplicationListExampleComponent {
  protected readonly reloading = signal(false);
  protected listClass = '';

  // Hardcoded for the example. The real list loads EcosystemService.getWebApplications(),
  // which returns hosted and external applications; microservices have their own page.
  protected readonly apps: App[] = [
    {
      id: 1,
      name: 'Cockpit',
      type: ApplicationType.HOSTED,
      description: 'Build dashboards and visualizations for your IoT data.',
      owner: false,
      contextPath: 'cockpit',
      icon: 'c8y-cockpit',
    },
    {
      id: 2,
      name: 'Device management',
      type: ApplicationType.HOSTED,
      description: 'Register, monitor and manage all connected devices.',
      owner: false,
      contextPath: 'devicemanagement',
      icon: 'c8y-device-management',
    },
    {
      id: 3,
      name: 'Administration',
      type: ApplicationType.HOSTED,
      description: 'Manage tenant settings, users and access rights.',
      owner: false,
      contextPath: 'administration',
      icon: 'c8y-administration',
    },
    {
      id: 4,
      name: 'Streaming Analytics',
      type: ApplicationType.HOSTED,
      description: 'Analyze IoT data streams in real time.',
      owner: false,
      contextPath: 'streaming-analytics',
      icon: 'c8y-streaming-analytics',
    },
    {
      id: 5,
      name: 'Digital Twin Manager',
      type: ApplicationType.HOSTED,
      description: 'Model assets and their hierarchies.',
      owner: false,
      contextPath: 'digital-twin-manager',
      icon: 'c8y-enterprise',
    },
    {
      id: 6,
      name: 'DataHub',
      type: ApplicationType.HOSTED,
      description: 'Offload and query historical IoT data at scale using SQL.',
      owner: false,
      contextPath: 'datahub',
      icon: 'c8y-data-hub',
    },
    {
      id: 9,
      name: 'Fleet dashboard',
      type: ApplicationType.HOSTED,
      owner: true,
      description: 'Custom web application uploaded by this tenant.',
      contextPath: 'fleet-dashboard',
      icon: 'dashboard',
    },
    {
      id: 7,
      name: 'Documentation',
      type: ApplicationType.EXTERNAL,
      description: 'Opens the Cumulocity documentation in a new tab.',
      owner: true,
      contextPath: 'docs',
      icon: 'book',
    },
    {
      id: 8,
      name: 'Support portal',
      type: ApplicationType.EXTERNAL,
      description: 'Opens the customer support portal in a new tab.',
      owner: true,
      contextPath: 'support',
      icon: 'life-ring',
    },
  ];

  /** Mirrors EcosystemService.getAppState for the states this list can show. */
  stateOf(app: App): { label: string; class: string } {
    if (!app.owner) {
      return APP_STATE.SUBSCRIBED;
    }
    if (app.type === ApplicationType.EXTERNAL) {
      return APP_STATE.EXTERNAL;
    }
    return APP_STATE.CUSTOM;
  }

  onListClassChange(cls: string): void {
    this.listClass = cls;
  }

  reload(): void {
    this.reloading.set(true);
    setTimeout(() => this.reloading.set(false), 1200);
  }

  addApplication(): void {
    // eslint-disable-next-line no-console
    console.log('Add application');
  }
}
