import { Component } from '@angular/core';
import { CommonModule, CoreModule } from '@c8y/ngx-components';
import { DeviceGridModule } from '@c8y/ngx-components/device-grid';
import { DeviceListModule } from '@c8y/ngx-components/device-list';

@Component({
  selector: 'help-example',
  templateUrl: './help-example.component.html',
  standalone: true,
  imports: [CoreModule, CommonModule, DeviceGridModule, DeviceListModule]
})
export class HelpExampleComponent {}
