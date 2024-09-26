import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tutorial-lazy-widget-view',
  template: `<p>This widget's view component/module is only loaded when needed.</p>`,
  standalone: true,
  imports: [CommonModule]
})
export class LazyWidgetViewComponent {}
