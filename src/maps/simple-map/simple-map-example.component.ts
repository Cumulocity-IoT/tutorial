import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import {
  MapConfig,
  MapModule,
  MapService,
  PositionManagedObject,
  defaultMapConfig
} from '@c8y/ngx-components/map';

@Component({
  selector: 'c8y-simple-map-examples',
  templateUrl: './simple-map-example.component.html',
  standalone: true,
  imports: [CommonModule, MapModule, CoreModule, AssetSelectorModule]
})
export class SimpleMapExampleComponent implements OnInit {
  exampleDevices: PositionManagedObject | PositionManagedObject[];
  config: MapConfig = {};
  private oneDevice: PositionManagedObject;
  private allDevices: PositionManagedObject[];

  constructor(private mapService: MapService) {}

  async ngOnInit() {
    const devices = await this.mapService.getPositionDevices();
    this.oneDevice = devices[0];
    this.allDevices = devices as PositionManagedObject[];
    this.exampleDevices = this.oneDevice;
  }

  changeDevices() {
    if (Array.isArray(this.exampleDevices)) {
      this.exampleDevices = this.oneDevice;
    } else {
      this.exampleDevices = this.allDevices;
    }
  }

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

  toggleRealtime() {
    this.config = { ...this.config, realtime: !this.config.realtime };
  }

  toggleFollow() {
    this.config = {
      ...this.config,
      follow: !this.config.follow,
      disablePan: !this.config.follow,
      disableZoom: !this.config.follow
    };
  }
}
