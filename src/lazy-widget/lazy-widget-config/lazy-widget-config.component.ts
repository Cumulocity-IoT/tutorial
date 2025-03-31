import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetConfig } from '../widget-config.model';

@Component({
  selector: 'tutorial-lazy-widget-config',
  template: `<p>This widget's configuration component/module is only loaded when needed.</p>`,
  standalone: true,
  imports: [CommonModule]
})
export class LazyWidgetConfigComponent {
  @Input() config: WidgetConfig;
}
