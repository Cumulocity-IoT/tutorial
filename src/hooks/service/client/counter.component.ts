import { Component } from '@angular/core';
import { ServiceRegistry } from '@c8y/ngx-components';
import { ICounterService } from '../counter/counter.model';

@Component({
  selector: 'tut-counter-component',
  templateUrl: './counter.component.html',
  standalone: true
})
export class CounterComponent {
  counter: ICounterService;

  constructor(registry: ServiceRegistry) {
    /**
     * To retrieve an instance of a service injected by `hookService` you can use ServiceRegistry.get(key) method.
     * It will return all injected service instances in a type-safe manner if there is a typed extension key declared.
     * For an example of such declaration check the declarations in `counter/counter.model.ts`.
     */
    this.counter = registry.get('counter').at(0);
  }
}
