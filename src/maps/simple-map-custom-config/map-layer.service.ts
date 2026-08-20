import { Injectable } from '@angular/core';
import { defaultLayer } from '@c8y/ngx-components/map';
import { MapTileLayer } from '@c8y/options';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * The tile layers this example can switch to, next to the default layer.
 */
export type CustomMapTileLayerName = 'Carto' | 'OpenTopo';

@Injectable({
  providedIn: 'root',
})
export class MapLayerService implements CumulocityServiceRegistry.MapTileLayerProvider {
  maps$ = new BehaviorSubject<MapTileLayer[]>([defaultLayer]);

  getMapTileLayers$(): Observable<MapTileLayer[]> {
    return this.maps$;
  }

  overridesDefaultLayer(): boolean {
    return true;
  }

  changeLayer(name: CustomMapTileLayerName) {
    if (name === 'Carto') {
      this.maps$.next([
        {
          layerUrl: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
          label: 'Carto',
          priority: 1000,
          options: {
            maxZoom: 12,
          },
        },
      ]);
    } else if (name === 'OpenTopo') {
      this.maps$.next([
        {
          layerUrl: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          label: 'OpenTopo',
          priority: 1000,
          options: {
            maxZoom: 17,
            minZoom: 0,
          },
        },
      ]);
    }
  }

  revert() {
    this.maps$.next([defaultLayer]);
  }
}
