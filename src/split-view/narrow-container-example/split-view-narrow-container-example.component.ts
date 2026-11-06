// Based on packages/ngx-components/alarms/alarms.component.html: the alarms split view next to a
// side panel (in Cockpit, the AI assistant) that narrows it while the window stays wide.
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {
  C8yTranslatePipe,
  DatePipe,
  IconDirective,
  ListGroupComponent,
  ListItemBodyComponent,
  ListItemComponent,
  ListItemIconComponent,
  ListItemTimelineComponent,
  SplitViewComponent,
  SplitViewDetailsComponent,
  SplitViewListComponent,
  TitleComponent,
} from '@c8y/ngx-components';
import { AlarmsIconComponent } from '@c8y/ngx-components/alarms';
import { gettext } from '@c8y/ngx-components/gettext';
import { SplitViewAlarmsExampleStore } from '../alarms-example.store';

@Component({
  selector: 'c8y-split-view-narrow-container-example',
  templateUrl: './split-view-narrow-container-example.component.html',
  styleUrl: './split-view-narrow-container-example.component.scss',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    C8yTranslatePipe,
    DatePipe,
    IconDirective,
    TitleComponent,
    ListGroupComponent,
    ListItemTimelineComponent,
    ListItemComponent,
    ListItemIconComponent,
    ListItemBodyComponent,
    AlarmsIconComponent,
    SplitViewComponent,
    SplitViewListComponent,
    SplitViewDetailsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitViewNarrowContainerExampleComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly alarms = inject(SplitViewAlarmsExampleStore).alarms;
  protected readonly panelOpen = signal(false);
  protected readonly openPanelLabel = gettext('Open side panel');
  protected readonly closePanelLabel = gettext('Close side panel');

  closeDetails(): void {
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
