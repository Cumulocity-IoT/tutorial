import { Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent, MapModule, MapService } from '@c8y/ngx-components/map';
import { MapConfig, PositionManagedObject } from '@c8y/ngx-components/map';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@c8y/ngx-components';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';

@Component({
  selector: 'tut-map-popup-examples',
  templateUrl: './map-popup-example.component.html',
  standalone: true,
  imports: [CommonModule, MapModule, CoreModule, AssetSelectorModule]
})
export class MapPopupExampleComponent implements OnInit {
  exampleDevices: PositionManagedObject | PositionManagedObject[];
  config: MapConfig = {};
  private oneDevice: PositionManagedObject;
  private allDevices: PositionManagedObject[];

  @ViewChild(MapComponent)
  map: MapComponent;

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

  showFirstPopup() {
    this.map.markers[0].fireEvent('click');
  }
}
