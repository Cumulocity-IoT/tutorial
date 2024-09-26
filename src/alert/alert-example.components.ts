import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService, CoreModule } from '@c8y/ngx-components';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'c8y-alert-example',
  templateUrl: './alert-example.components.html',
  standalone: true,
  imports: [CommonModule, FormsModule, CoreModule]
})
export class AlertExampleComponents {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('templateRef', { read: TemplateRef }) templateRef: TemplateRef<any>;

  constructor(private alertService: AlertService) {}

  successAlert() {
    this.alertService.success('Success toast');
  }
  dangerAlert() {
    this.alertService.danger('Danger toast');
  }

  infoAlert() {
    this.alertService.info('Info toast');
  }

  warningAlert() {
    this.alertService.warning('Warning toast');
  }

  systemAlert() {
    this.alertService.addByText('system', 'This is a system toast');
  }

  dangerWithDetails() {
    this.alertService.danger('Error toast', ' Error toast details');
  }

  dangerAlertByText() {
    this.alertService.addByText('warning', 'This is a warning toast', ' with details');
  }

  addAlertByAlertObject() {
    this.alertService.add({
      type: 'system',
      text: 'System toast',
      timeout: 5000,
      detailedData: ' Alert details'
    });
  }

  addAlertWithHtml() {
    this.alertService.add({
      text: '<p>This is a <b>toast</b> with <code>HTML</code> content</p>',
      allowHtml: true,
      type: 'success'
    });
  }

  alertWithTemplateRef() {
    this.alertService.add({ type: 'info', text: this.templateRef });
  }

  addAlertWithCallbacks() {
    this.alertService.add({
      type: 'warning',
      text: 'Console log on close or show details.',
      detailedData: ' Alert details',
      // eslint-disable-next-line no-console
      onClose: () => console.log('Alert closed'),
      // eslint-disable-next-line no-console
      onDetail: () => console.log('Details opened.')
    });
  }
}
