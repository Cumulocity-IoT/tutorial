import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'tut-refresh-element',
  templateUrl: './refresh-element.component.html',
  standalone: true,
  imports: [CoreModule],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class RefreshActionComponent {
  requestInProgress: boolean;

  refresh(): void {
    this.requestInProgress = true;

    setTimeout(() => {
      console.log('Carbon footprint enlarged.');
      this.requestInProgress = false;
    }, 1000);
  }
}
