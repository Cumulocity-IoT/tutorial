import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetConfig } from '../widget-config.model';

@Component({
  selector: 'tutorial-lazy-widget-view',
  template: `<p>This widget's view component/module is only loaded when needed.</p>`,
  standalone: true,
  imports: [CommonModule]
})
export class LazyWidgetViewComponent {
  @Input() config: WidgetConfig;
}
