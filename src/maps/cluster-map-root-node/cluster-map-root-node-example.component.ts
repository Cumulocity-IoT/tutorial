import { Component } from '@angular/core';
import { ClusterMapConfig, defaultMapConfig, MapModule } from '@c8y/ngx-components/map';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';

@Component({
  selector: 'tut-cluster-map-root-node-example',
  templateUrl: './cluster-map-root-node-example.component.html',
  standalone: true,
  imports: [CommonModule, MapModule, CoreModule, AssetSelectorModule]
})
export class ClusterMapRootNodeExampleComponent {
  config: ClusterMapConfig = { center: defaultMapConfig.center, zoomLevel: 4 };
  followConfig: ClusterMapConfig = { center: defaultMapConfig.center, zoomLevel: 4 };

  rootNode: unknown;
  oldRootNode: unknown;

  toggleAutorefresh() {
    this.config = {
      ...this.config,
      refreshInterval: this.config.refreshInterval ? undefined : 5000
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
      zoomLevel: 14
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
      realtime: false
    };
  }
}
