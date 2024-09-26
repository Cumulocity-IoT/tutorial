import { Component } from '@angular/core';
import { ClusterMapConfig, defaultMapConfig, MapModule } from '@c8y/ngx-components/map';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';

@Component({
  selector: 'tut-cluster-map-example',
  templateUrl: './cluster-map-example.component.html',
  standalone: true,
  imports: [CommonModule, MapModule, CoreModule, AssetSelectorModule]
})
export class ClusterMapExampleComponent {
  config: ClusterMapConfig = { center: defaultMapConfig.center, zoomLevel: 4 };
  showClusterColor = false;

  setRandomZoomLevel() {
    this.config = { ...this.config, zoomLevel: Math.floor(1 + Math.random() * 11) };
  }

  setCenter() {
    this.config = { ...this.config, center: defaultMapConfig.center };
  }

  changeIcon() {
    this.config = { ...this.config, icon: this.config.icon ? undefined : 'map' };
  }

  changeColor() {
    this.config = { ...this.config, color: this.config.color ? undefined : '#0f0' };
  }

  toggleAutorefresh() {
    this.config = {
      ...this.config,
      refreshInterval: this.config.refreshInterval ? undefined : 5000
    };
  }
}
