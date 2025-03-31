import { Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { DynamicComponent, OnBeforeSave, AlertService } from '@c8y/ngx-components';
import { omit } from 'lodash';
import { WidgetConfig } from './widget-config.model';

@Component({
  selector: 'c8y-widget-config-demo',
  template: `
    <div class="form-group">
      <c8y-form-group>
        <label>Text</label>
        <textarea
          style="width: 100%"
          name="text"
          [(ngModel)]="config.text"
          [required]="true"
        ></textarea>
      </c8y-form-group>

      <label
        >Configuration
        <button class="btn btn-primary btn-xs" type="button" (click)="more = !more">
          {{ more ? 'Hide' : 'Show' }} settings
        </button></label
      >
      <pre><code>{{ clean(config, more) | json }}</code></pre>
    </div>
  `,
  // We connect our parent Form to this form (for disabling the save button)
  // you can also enable the button by using ContextServiceDashboard.formDisabled
  // property instead (by default it is enabled).
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class WidgetConfigDemo implements DynamicComponent, OnBeforeSave {
  /**
   * The configuration which is shared between configuration component and display component.
   * Should be searilzabled to allow to save it to the API. The config is saved automatically
   * to the API on "save"-button hit. The onBeforeSave handler can be used to change this behavior,
   * or to manipulate the object.
   *
   * Note: The dashboard itself adds certain properties. As such, some properties are not allowed (e.g. device or settings)
   */
  @Input() config: WidgetConfig = {};

  /**
   * An internal component property used to hide/show settings.
   */
  more = false;

  /**
   * Default Angular DI can be used, to use additional services.
   */
  constructor(private alert: AlertService) {}

  /**
   * This example onBeforeSave handler cancels the saving, if the text is only a white-space.
   */
  onBeforeSave(config: any): boolean {
    if (config.text.trim() === '') {
      this.alert.warning('Please enter a valid text.');
      return false;
    }
    this.config.widgetInstanceGlobalTimeContext = true;
    this.config.canDecoupleGlobalTimeContext = true;
    return true;
  }

  /**
   * Used to hide/show config settings on toggle.
   */
  clean(config, more) {
    if (more) {
      return config;
    }
    return omit(config, 'settings');
  }

  selectionChanged(e) {
    console.log(e);
  }
}
