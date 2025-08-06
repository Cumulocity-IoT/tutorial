import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  HookProviderTypes,
  NavigatorNode,
  hookNavigator,
  hookRoute,
  hookService
} from '@c8y/ngx-components';
import { MapLayerService } from './map-layer.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    MapLayerService,
    hookService('mapTileLayerHook', MapLayerService, {
      providerType: HookProviderTypes.ExistingProvider
    }),
    hookRoute({
      path: 'maps/simple-with-custom-config',
      loadComponent: () =>
        import('./simple-map-custom-config.component').then(m => m.SimpleMapCustomConfigComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        priority: 30,
        path: 'maps/simple-with-custom-config',
        icon: 'map-editing',
        label: 'Simple map with custom config',
        parent: 'Map examples'
      })
    )
  ]
})
export class SimpleMapCustomConfigModule {}
