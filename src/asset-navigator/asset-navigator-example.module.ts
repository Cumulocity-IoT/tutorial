import { NgModule } from '@angular/core';
import { AssetsNavigatorModule, AssetNavigatorConfig } from '@c8y/ngx-components/assets-navigator';

@NgModule({
  imports: [
    AssetsNavigatorModule.config({
      // Provide your custom configuration options here
      smartGroups: true,
      openOnStart: true,
      rootNodePriority: 3000,
      disableDragAndDrop: false,
      rootNavigatorNode: {
        label: 'Custom Root Node'
        // You can provide other NavigatorNode properties as needed
      }
    } as AssetNavigatorConfig)
  ],
  declarations: [],
  bootstrap: []
})
export class AppModule {}
