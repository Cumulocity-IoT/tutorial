import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tut-simple-component',
  template: `<p>Hello there! I am a simple component added by <code>hookComponent</code>.</p>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class SimpleComponent {}
