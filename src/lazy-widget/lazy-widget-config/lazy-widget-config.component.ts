import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetConfigService } from '@c8y/ngx-components/context-dashboard';
import { WidgetConfig } from '../widget-config.model';
import { LazyWidgetViewComponent } from '../lazy-widget-view';

@Component({
  selector: 'tutorial-lazy-widget-config',
  template: `<p>This widget's configuration component/module is only loaded when needed.</p>
    <ng-template #lazyWidgetPreview>
      <tutorial-lazy-widget-view></tutorial-lazy-widget-view>
    </ng-template>`,
  standalone: true,
  imports: [CommonModule, LazyWidgetViewComponent]
})
export class LazyWidgetConfigComponent {
  @Input() config: WidgetConfig;

  @ViewChild('lazyWidgetPreview', { static: true })
  set previewMapSet(template: TemplateRef<any>) {
    if (template) {
      this.widgetConfigService.setPreview(template);
      return;
    }
    this.widgetConfigService.setPreview(null);
  }

  constructor(private widgetConfigService: WidgetConfigService) {}
}
