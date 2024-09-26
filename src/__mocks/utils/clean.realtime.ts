import { Injectable } from '@angular/core';
import { OptionsService } from '@c8y/ngx-components';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CleanRealtime {
  stop$: Subject<void> = new Subject();
  onDestroy$: Subject<void> = new Subject();

  constructor(private options: OptionsService) {}

  onDestroy() {
    if (this.options.get('noLogin', false) && this.onDestroy$) {
      this.onDestroy$.next();
    }
  }

  stop() {
    if (this.options.get('noLogin', false) && this.stop$) {
      this.stop$.next();
    }
  }
}
