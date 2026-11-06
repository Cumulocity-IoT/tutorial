// Based on packages/ngx-components/alarms/alarms-list.component.html (list empty state) and
// alarms.component.html (details empty state). The severity toggles stand in for the alarm filter.
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { SeverityType } from '@c8y/client';
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
  SplitViewHeaderActionsComponent,
  SplitViewListComponent,
  TitleComponent,
} from '@c8y/ngx-components';
import { AlarmsIconComponent } from '@c8y/ngx-components/alarms';
import { gettext } from '@c8y/ngx-components/gettext';
import { SplitViewAlarmsExampleStore } from '../alarms-example.store';

@Component({
  selector: 'c8y-split-view-empty-state-example',
  templateUrl: './split-view-empty-state-example.component.html',
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
    SplitViewHeaderActionsComponent,
    SplitViewDetailsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitViewEmptyStateExampleComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly alarms = inject(SplitViewAlarmsExampleStore).alarms;

  protected readonly severities: { value: SeverityType; label: string }[] = [
    { value: 'CRITICAL', label: gettext('Critical') },
    { value: 'MAJOR', label: gettext('Major') },
    { value: 'MINOR', label: gettext('Minor') },
    { value: 'WARNING', label: gettext('Warning') },
  ];
  /** Starts with only Critical so turning it off shows the empty list. */
  protected readonly shown = signal<SeverityType[]>(['CRITICAL']);
  protected readonly filtered = computed(() =>
    this.alarms().filter((alarm) => this.shown().includes(alarm.severity)),
  );

  toggle(severity: SeverityType): void {
    this.shown.update((shown) =>
      shown.includes(severity) ? shown.filter((s) => s !== severity) : [...shown, severity],
    );
  }

  closeDetails(): void {
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
