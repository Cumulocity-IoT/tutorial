import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'tut-refresh-element',
  templateUrl: './refresh-element.component.html',
  standalone: true,
  imports: [CoreModule]
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
