import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { hookVersion } from '@c8y/ngx-components';
import { CustomVersionFactory } from './custom-version-factory.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [hookVersion(CustomVersionFactory)]
})
export class TutorialVersionModule {}
