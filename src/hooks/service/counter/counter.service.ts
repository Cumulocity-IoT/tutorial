import { Injectable } from '@angular/core';
import { ICounterService } from './counter.model';

@Injectable({ providedIn: 'root' })
export class CounterService implements ICounterService {
  counter = 0;
  count() {
    this.counter++;
  }
}
