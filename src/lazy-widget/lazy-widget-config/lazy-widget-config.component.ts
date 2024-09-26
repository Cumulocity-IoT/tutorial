import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tutorial-lazy-widget-config',
  template: `<p>This widget's configuration component/module is only loaded when needed.</p>`,
  standalone: true,
  imports: [CommonModule]
})
export class LazyWidgetConfigComponent {}
