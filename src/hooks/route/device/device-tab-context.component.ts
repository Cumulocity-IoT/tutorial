import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'device-tab-context',
  templateUrl: './device-tab-context.component.html',
  standalone: true,
  imports: [CoreModule]
})
export class DeviceTabContextComponent {
  constructor(public route: ActivatedRoute) {}
}
