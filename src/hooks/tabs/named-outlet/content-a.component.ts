import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tut-content-a',
  template: `<div>This is content for <b>Tab A</b>.</div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ContentAComponent {}
