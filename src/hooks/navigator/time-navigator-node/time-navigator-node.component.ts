import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-time-navigator-node',
  template: `<p class="text-center">Current time:</p>
    <p class="text-center">{{ currentTime$ | async | date: 'medium' }}</p> `,
  standalone: true,
  imports: [CoreModule]
})
export class TimeNavigatorNodeComponent {
  currentTime$: Observable<Date>;

  constructor() {
    this.currentTime$ = timer(0, 1000).pipe(map(() => new Date()));
  }
}
