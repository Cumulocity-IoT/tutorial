import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

/**
 * This is the component that hosts the Service demo view.
 */
@Component({
  selector: 'tut-basic-component-hook-view',
  templateUrl: './basic-view.component.html',
  standalone: true,
  imports: [CoreModule]
})
export class BasicViewComponent {}
