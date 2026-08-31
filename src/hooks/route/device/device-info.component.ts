import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'device-info',
  templateUrl: './device-info.component.html',
  standalone: true,
  imports: [CoreModule],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class DeviceInfoComponent {
  constructor(public route: ActivatedRoute) {}
}
