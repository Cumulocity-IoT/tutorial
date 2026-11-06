// Based on packages/ngx-components/alarms/alarm-details.component.html
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { AlarmStatusType, IAlarm } from '@c8y/client';
import {
  C8yTranslatePipe,
  IconPanelComponent,
  IconPanelSection,
  SplitViewAction,
  SplitViewDetailsActionsComponent,
} from '@c8y/ngx-components';
import { gettext } from '@c8y/ngx-components/gettext';
import { map } from 'rxjs';
import { SplitViewAlarmsExampleStore } from '../alarms-example.store';

@Component({
  selector: 'c8y-split-view-alarm-details-example',
  templateUrl: './split-view-alarm-details-example.component.html',
  imports: [C8yTranslatePipe, IconPanelComponent, SplitViewDetailsActionsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitViewAlarmDetailsExampleComponent {
  private readonly store = inject(SplitViewAlarmsExampleStore);
  private readonly alarmId = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map((params) => params.get('id') ?? '')),
  );

  protected readonly alarm = computed(() => {
    this.store.alarms();
    return this.store.find(this.alarmId());
  });

  protected readonly sections = computed<IconPanelSection[]>(() => {
    const alarm = this.alarm();
    if (!alarm) {
      return [];
    }
    return [
      section('status', gettext('Status'), 'bell', alarm.status),
      section('severity', gettext('Severity'), 'exclamation-triangle', alarm.severity),
      section('source', gettext('Source'), 'exchange', alarm.source.name),
      section('type', gettext('Type'), 'c8y-alarm', alarm.type),
    ];
  });

  protected readonly actions = computed<SplitViewAction[]>(() => {
    const alarm = this.alarm();
    if (!alarm) {
      return [];
    }
    const isAcknowledged = alarm.status === 'ACKNOWLEDGED';
    const isCleared = alarm.status === 'CLEARED';
    return [
      action(
        'acknowledgeReactivate',
        isAcknowledged ? gettext('Reactivate') : gettext('Acknowledge'),
        isAcknowledged ? 'bell' : 'bell-slash',
        isCleared,
        () => this.setStatus(alarm, isAcknowledged ? 'ACTIVE' : 'ACKNOWLEDGED'),
      ),
      action('clear', gettext('Clear`alarm`'), 'c8y-alert-idle', isCleared, () =>
        this.setStatus(alarm, 'CLEARED'),
      ),
    ];
  });

  private setStatus(alarm: IAlarm, status: AlarmStatusType): void {
    this.store.setStatus(String(alarm.id), status);
  }
}

function section(id: string, label: string, icon: string, content: string): IconPanelSection {
  return { id, label, icon, content, visible: true };
}

function action(
  id: string,
  label: string,
  icon: string,
  disabled: boolean,
  run: () => void,
): SplitViewAction {
  return { id, label, icon, class: 'btn btn-default btn-sm', disabled, visible: true, action: run };
}
