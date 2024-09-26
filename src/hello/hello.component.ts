import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

/**
 * The hello.component shows a short introduction text and
 * a little list of things that you can discover within this
 * tutorial application.
 */
@Component({
  selector: 'hello',
  template: `
    <!-- The c8y-title component will display the given string (here: "Hello") in the header as title -->
    <c8y-title>Hello</c8y-title>
    <div class="card">
      <div class="card-header separator">
        <h4 class="card-title">{{ introductionText }}</h4>
      </div>
      <div class="card-block">
        <ul>
          <li>Navigator (panel on the left)</li>
          <li><a href="#/lists/list-check">Lists</a></li>
          <li><a href="#/hooks/action">Hooks</a></li>
          <li><a href="#/quick-link">Quick link</a></li>
          <li><a href="#/dynamic-forms/introduction">Dynamic forms</a></li>
          <li><a href="#/help">Help</a></li>
          <li><a href="#/popconfirm">Pop confirm</a></li>
          <li><a href="#/css">Styles</a></li>
          <li><a href="#/grids/client-grid-example">Grid</a></li>
          <li><a href="#/css">Styles</a></li>
          <li><a href="#/input">Input</a></li>
          <li><a href="#/extendable-input-list">Extendable input list example</a></li>
          <li><a href="#/maps/simple">Maps</a></li>
          <li><a href="#/translations/text-translation/service-translation">Translations</a></li>
          <li><a href="#/realtime">Realtime</a></li>
          <li><a href="#/stepper">Stepper</a></li>
          <li><a href="#/time-picker">Time picker</a></li>
          <li><a href="#/dashboards/custom">Dashboards</a></li>
          <li>
            <a href="#/provider-configuration/introduction-example">Providers configuration </a>
          </li>
          <li><a href="#/properties-list">Properties list</a></li>
        </ul>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CoreModule]
})
export class HelloComponent {
  introductionText: string;

  constructor() {
    this.introductionText =
      '... this basic Application will show you some concepts and components about';
  }
}
