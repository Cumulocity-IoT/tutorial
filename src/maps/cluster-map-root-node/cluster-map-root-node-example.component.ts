import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ClusterMapConfig, defaultMapConfig, MapModule } from '@c8y/ngx-components/map';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@c8y/ngx-components';
import {
  AssetSelectionChangeEvent,
  AssetSelectorModule,
} from '@c8y/ngx-components/assets-navigator';

/**
 * Zoom level the map uses when it centers on a selected group, chosen so that the devices of one
 * place fill the map.
 */
const GROUP_ZOOM_LEVEL = 11;

@Component({
  selector: 'tut-cluster-map-root-node-example',
  templateUrl: './cluster-map-root-node-example.component.html',
  standalone: true,
  imports: [CommonModule, MapModule, CoreModule, AssetSelectorModule],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ClusterMapRootNodeExampleComponent {
  config: ClusterMapConfig = { center: defaultMapConfig.center, zoomLevel: 4 };
  followConfig: ClusterMapConfig = { center: defaultMapConfig.center, zoomLevel: 4 };

  rootNode: unknown;
  oldRootNode: unknown;

  /**
   * Centers the map on the selected group. The asset selector passes the full managed object as
   * `change.item` (its model value is simplified to id and name), so the group position is read
   * from there.
   * @param event The selection change emitted by the asset selector.
   */
  onGroupSelected(event: AssetSelectionChangeEvent) {
    this.resetConfig();

    const position = event?.change?.isSelected ? event.change.item?.c8y_Position : undefined;
    if (position) {
      this.followConfig = {
        ...this.followConfig,
        center: [position.lat, position.lng],
        zoomLevel: GROUP_ZOOM_LEVEL,
      };
    }
  }

  toggleAutorefresh() {
    this.config = {
      ...this.config,
      refreshInterval: this.config.refreshInterval ? undefined : 5000,
    };
  }

  startFollow(device) {
    this.oldRootNode = this.rootNode;
    this.rootNode = device;
    this.followConfig = {
      ...this.followConfig,
      follow: true,
      disablePan: true,
      disableZoom: true,
      realtime: true,
      zoomLevel: 14,
    };
  }

  stopFollow() {
    this.rootNode = this.oldRootNode;
    this.resetConfig();
  }

  resetConfig() {
    this.followConfig = {
      ...this.followConfig,
      follow: false,
      disablePan: false,
      disableZoom: false,
      realtime: false,
    };
  }
}
