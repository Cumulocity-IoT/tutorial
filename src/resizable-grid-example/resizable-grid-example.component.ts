import { Component } from '@angular/core';
import { ResizableGridComponent, CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'tutorial-resizable-grid-example',
  template: `<c8y-title>Resizable Grid</c8y-title>
    <div class="p-t-24">
      <div class="card">
        <c8y-resizable-grid style="height: 350px;">
          <div left-pane>
            <div class="card-header">
              <h4>Left Column</h4>
            </div>
            <div class="card-block">
              <p>This is the left column content. You can resize it by dragging the divider.</p>
            </div>
          </div>
          <div right-pane>
            <div class="card-header">
              <h4>Right Column</h4>
            </div>
            <div class="card-block">
              <p>
                This is the right column content. It will expand or shrink as you resize the left
                column.
              </p>
            </div>
          </div>
        </c8y-resizable-grid>
      </div>
    </div>`,
  standalone: true,
  imports: [ResizableGridComponent, CoreModule]
})
export class ResizableGridExampleComponent {}
// This component demonstrates the usage of the ResizableGridComponent
