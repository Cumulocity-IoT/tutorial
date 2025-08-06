import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { MapModule } from '@c8y/ngx-components/map';
import { MapLayerService } from './map-layer.service';

@Component({
  selector: 'c8y-simple-map-custom-config',
  templateUrl: './simple-map-custom-config.component.html',
  standalone: true,
  imports: [CommonModule, MapModule, CoreModule, AssetSelectorModule]
})
export class SimpleMapCustomConfigComponent {
  mapLayerService = inject(MapLayerService);
}
