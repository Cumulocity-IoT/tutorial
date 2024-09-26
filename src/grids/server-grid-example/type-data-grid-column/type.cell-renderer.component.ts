import { Component, Inject } from '@angular/core';
import { CellRendererContext, CoreModule } from '@c8y/ngx-components';
import { ServerGridExampleService } from '../server-grid-example.service';

/**
 * The example component for custom cell renderer.
 * It gets `context` with the current row item and the column.
 * Additionally, a service is injected to provide a helper method.
 * The template displays the icon and the label with additional styling.
 */
@Component({
  template: `
    <span>
      <i class="m-r-5" [c8yIcon]="value.icon"></i>
      <code>{{ value.label }}</code>
    </span>
  `,
  selector: 'example-type-cell-renderer',
  standalone: true,
  imports: [CoreModule]
})
export class TypeCellRendererComponent {
  /** Returns the icon and label for the current item. */
  get value() {
    return this.service.getTypeIconAndLabel(this.context.item);
  }

  constructor(
    public context: CellRendererContext,
    @Inject(ServerGridExampleService) public service: ServerGridExampleService
  ) {}
}
