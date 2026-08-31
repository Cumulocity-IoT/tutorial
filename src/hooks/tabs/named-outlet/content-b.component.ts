import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tut-content-b',
  template: `<div>This is content for <b>Tab B</b>.</div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ContentBComponent {}
