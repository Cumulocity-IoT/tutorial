import { Component } from '@angular/core';
import {
  WizardComponent,
  WizardHeaderComponent,
  WizardBodyComponent,
  WizardFooterComponent
} from '@c8y/ngx-components';

@Component({
  selector: 'multiple-entries-one-component',
  template: `
    <c8y-wizard-header> New header entry 1 </c8y-wizard-header>
    <c8y-wizard-body> New body </c8y-wizard-body>
    <c8y-wizard-footer>
      <button class="btn btn-default" title="{{ 'Back' }}" (click)="back()">Back</button>
      <button class="btn btn-default" title="{{ 'Cancel' }}" (click)="cancel()">Cancel</button>
    </c8y-wizard-footer>
  `,
  standalone: true,
  imports: [WizardHeaderComponent, WizardBodyComponent, WizardFooterComponent]
})
export class MultipleEntriesOne {
  constructor(private wizardComponent: WizardComponent) {}

  cancel() {
    this.wizardComponent.close('Cancel triggered');
  }

  back() {
    this.wizardComponent.reset('Reset triggered');
  }
}
