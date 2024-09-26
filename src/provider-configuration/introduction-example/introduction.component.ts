import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { PopoverModule } from 'ngx-bootstrap/popover';

@Component({
  selector: 'c8y-introduction',
  template: `<c8y-title>Provider configuration</c8y-title>
    <div class="card">
      <div class="card-header separator">
        <h4 class="card-title">Introduction</h4>
      </div>
      <div class="card-block">
        <p>
          This sample demonstrates how you can utilize the
          <code>ProviderConfigurationModule</code> to compose your own configuration UI.
        </p>
        <p>
          To configure the
          <strong
            ><a href="#provider-configuration/provider-configuration-example"
              >Demo provider</a
            ></strong
          >
          in the next section you first need to define the URLs for your
          <code>definitions</code> and <code>configuration</code> endpoints. To do this you need to
          provide the URLs in the configuration object passed to the <code>config</code> method of
          the <code>ProviderConfigurationModule</code> in the <code>imports</code> array of
          <code>provider-configuration/provider-configuration.module.ts</code>:
        </p>
        <br />
        <pre><code [innerHTML]="sampleConfig"></code></pre>
        <p>
          Once you have configured the endpoints you can proceed to the
          <strong
            ><a href="#provider-configuration/provider-configuration-example"
              >Demo provider</a
            ></strong
          >
          section. In the <strong>Demo provider</strong> (you can additionally configure custom
          labels and messages for your UI) dropdown you will see the list of providers returned by
          your <code>definitions</code> endpoint. After you select a provider a form will be shown
          displaying the fields configured in the JSON Schema for the provider. If there is an
          existing configuration for the selected provider, it will be displayed. The form provides
          options to create, update and delete provider configurations. Currently only one active
          configuration is supported.
        </p>
      </div>
    </div>`,
  standalone: true,
  imports: [PopoverModule, CoreModule]
})
export class IntroductionComponent {
  sampleConfig = `ProviderConfigurationModule.config([
  {
    navigation: { ... },
    layout: { ... },
    endpoint: {
      definitionsEndpoint: {
        baseUrl: 'service/demo/providers', // replace with your provider definitions base URL part
        listUrl: 'definitions' // replace with your provider definitions list URL part
      },
      configurationEndpoint: {
        baseUrl: 'service/demo/providers', // replace with your provider configuration base URL part
        listUrl: 'configuration' // replace with your provider configuration list URL part
      }
    }
  }
])`;
}
