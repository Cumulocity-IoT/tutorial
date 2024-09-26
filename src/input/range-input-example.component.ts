import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-range-input-example',
  template: `<c8y-title> Range Input examples </c8y-title>
    <div class="p-t-24">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="range1">valueDisplayMode inline (default) </label>
            <c8y-range>
              <input id="range1" type="range" min="0" max="100" steps="1" />
            </c8y-range>
          </div>
          <div class="form-group">
            <label for="range2">valueDisplayMode start</label>
            <c8y-range valueDisplayMode="start">
              <input id="range2" type="range" min="0" max="100" steps="1" />
            </c8y-range>
          </div>
          <div class="form-group">
            <label for="range3">valueDisplayMode end</label>
            <c8y-range valueDisplayMode="end">
              <input id="range3" type="range" min="0" max="100" steps="1" />
            </c8y-range>
          </div>
          <div class="form-group">
            <label for="range4">valueDisplayMode pop</label>
            <c8y-range valueDisplayMode="pop">
              <input id="range4" type="range" min="0" max="100" steps="1" />
            </c8y-range>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="range5">Custom label with valueDisplayMode inline (default)</label>
            <c8y-range #range5>
              <ng-template #c8yRangeValue>
                <span>
                  <span>The <strong>Value</strong> is: {{ range5.value }}</span>
                </span>
              </ng-template>
              <input id="range5" type="range" min="0" max="100" steps="1" />
            </c8y-range>
          </div>
          <div class="form-group">
            <label for="range6">Custom label with valueDisplayMode start</label>
            <c8y-range #range6 valueDisplayMode="start">
              <ng-template #c8yRangeValue>
                <span>
                  <span>The <strong>Value</strong> is: {{ range6.value }}</span>
                </span>
              </ng-template>
              <input id="range6" type="range" min="0" max="100" steps="1" />
            </c8y-range>
          </div>
          <div class="form-group">
            <label for="range7">Custom label with valueDisplayMode end</label>
            <c8y-range #range7 valueDisplayMode="end">
              <ng-template #c8yRangeValue>
                <span>
                  <span>The <strong>Value</strong> is: {{ range7.value }}</span>
                </span>
              </ng-template>
              <input id="range7" type="range" min="0" max="100" steps="1" />
            </c8y-range>
          </div>
          <div class="form-group">
            <label for="range8">Custom label with valueDisplayMode pop</label>
            <c8y-range #range8 valueDisplayMode="pop">
              <ng-template #c8yRangeValue>
                <span>
                  <span>The <strong>Value</strong> is: {{ range8.value }}</span>
                </span>
              </ng-template>
              <input id="range8" type="range" min="0" max="100" steps="1" />
            </c8y-range>
          </div>
        </div>
      </div>
    </div>`,
  standalone: true,
  imports: [CoreModule]
})
export class RangeInputExampleComponent {}
