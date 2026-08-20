import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { MapModule } from '@c8y/ngx-components/map';
import { CustomMapTileLayerName, MapLayerService } from './map-layer.service';

@Component({
  selector: 'c8y-simple-map-custom-config',
  templateUrl: './simple-map-custom-config.component.html',
  standalone: true,
  imports: [CommonModule, MapModule, CoreModule, AssetSelectorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleMapCustomConfigComponent {
  /**
   * The layer the map is currently showing. `c8y-map` reads the layers provided via
   * `mapTileLayerHook` while it initializes, so the template uses this value to re-create the
   * map whenever another layer is selected.
   */
  protected readonly selectedLayer = signal<CustomMapTileLayerName | 'default'>('default');

  private readonly mapLayerService = inject(MapLayerService);

  /**
   * Provides the given layer through `MapLayerService` and shows the map with it.
   * @param layer The layer to show, or `default` for the layer the map ships with.
   */
  protected showLayer(layer: CustomMapTileLayerName | 'default') {
    if (layer === 'default') {
      this.mapLayerService.revert();
    } else {
      this.mapLayerService.changeLayer(layer);
    }
    this.selectedLayer.set(layer);
  }
}
