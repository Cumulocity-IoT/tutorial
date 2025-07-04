import { NgModule } from '@angular/core';
import { PreviewFeatureCustomModule } from './basic-view-custom/preview-feature-custom.module';
import { PreviewFeatureDefaultModule } from './basic-view-default/preview-feature-default.module';

/**
 * This module combines both PreviewFeatureDefaultModule and PreviewFeatureCustomModule.
 */
@NgModule({
  imports: [PreviewFeatureDefaultModule, PreviewFeatureCustomModule]
})
export class PreviewFeatureModule {}
