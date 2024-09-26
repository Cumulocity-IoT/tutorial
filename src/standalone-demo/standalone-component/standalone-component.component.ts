import { Component } from '@angular/core';
import { HeaderModule } from '@c8y/ngx-components';

@Component({
  selector: 'app-standalone-component',
  templateUrl: './standalone-component.component.html',
  standalone: true,
  // imports done here instead of a separate ng module.
  imports: [HeaderModule]
})
export class StandaloneComponentComponent {}
