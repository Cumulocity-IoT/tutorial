import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { gettext } from '@c8y/ngx-components/gettext';
import {
  ActionBarItemComponent,
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  EmptyStateComponent,
  IconDirective,
  LoadingComponent,
  TitleComponent,
  C8yTranslatePipe,
} from '@c8y/ngx-components';

type ViewState = 'loading' | 'empty' | 'filtered-empty' | 'data';

interface Application {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const APPLICATIONS: Application[] = [
  {
    id: 1,
    name: 'Cockpit',
    description: 'Build dashboards and visualizations for your IoT data.',
    icon: 'c8y-cockpit',
  },
  {
    id: 2,
    name: 'Device management',
    description: 'Register, monitor and manage all connected devices.',
    icon: 'c8y-device-management',
  },
  {
    id: 3,
    name: 'Administration',
    description: 'Manage tenant settings, users and access rights.',
    icon: 'c8y-administration',
  },
];

@Component({
  selector: 'c8y-empty-loading-states-example',
  templateUrl: './empty-loading-states-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TitleComponent,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    ActionBarItemComponent,
    EmptyStateComponent,
    LoadingComponent,
    IconDirective,
    C8yTranslatePipe,
  ],
})
export class EmptyLoadingStatesExampleComponent {
  protected readonly viewState = signal<ViewState>('data');

  // The Applications list (Administration > Ecosystem) shows every application as Subscribed or
  // Custom; the three shown here are all provided by the parent tenant.
  protected readonly stateLabel = gettext('Subscribed`application`');

  protected readonly applications = computed<Application[]>(() =>
    this.viewState() === 'data' ? APPLICATIONS : [],
  );

  setState(state: ViewState): void {
    this.viewState.set(state);
  }
}
