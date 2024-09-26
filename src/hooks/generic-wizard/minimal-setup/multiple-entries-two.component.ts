import { Component } from '@angular/core';
import { WizardComponent } from '@c8y/ngx-components';

@Component({
  selector: 'multiple-entries-two-component',
  template: `
    <c8y-wizard-header> New header entry 2 </c8y-wizard-header>
    <c8y-wizard-body> New body </c8y-wizard-body>
    <c8y-wizard-footer>
      <button class="btn btn-default" title="{{ 'Back' }}" (click)="back()">Back</button>
      <button class="btn btn-default" title="{{ 'Cancel' }}" (click)="cancel()">Cancel</button>
    </c8y-wizard-footer>
  `
})
export class MultipleEntriesTwo {
  constructor(private wizardComponent: WizardComponent) {}

  cancel() {
    this.wizardComponent.close('Cancel triggered');
  }

  back() {
    this.wizardComponent.reset();
  }
}
