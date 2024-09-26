import { Component } from '@angular/core';
import { CellRendererContext } from '@c8y/ngx-components';

/**
 * The example component for custom header renderer.
 * The header text is taken from `this.context.property` which contains current column object.
 * Additionally the header has custom icon element and styled span element.
 */
@Component({
  template: `
    <i c8yIcon="rocket"></i>
    <span style="text-transform: uppercase; font-variant: small-caps; text-decoration: underline;">
      {{ context.property.header }}
    </span>
  `,
  selector: 'example-type-header-cell-renderer',
  standalone: true
})
export class TypeHeaderCellRendererComponent {
  constructor(public context: CellRendererContext) {}
}
