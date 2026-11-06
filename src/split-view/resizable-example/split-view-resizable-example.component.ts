// Based on packages/ngx-components/alarms/alarms.component.html and alarms-list.component.html
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
  SplitViewHeaderActionsComponent,
  SplitViewListComponent,
  TitleComponent,
} from '@c8y/ngx-components';
import { AlarmsIconComponent } from '@c8y/ngx-components/alarms';
import { SplitViewAlarmsExampleStore } from '../alarms-example.store';

@Component({
  selector: 'c8y-split-view-resizable-example',
  templateUrl: './split-view-resizable-example.component.html',
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
export class SplitViewResizableExampleComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly alarms = inject(SplitViewAlarmsExampleStore).alarms;
  protected readonly loading = signal(false);

  /** The platform reloads the alarms here; the example only shows the loading state. */
  refresh(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 800);
  }

  /** Closes the details the same way the alarms view does: by leaving the child route. */
  closeDetails(): void {
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
