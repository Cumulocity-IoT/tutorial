import { NgModule } from '@angular/core';
import { ProviderConfigurationModule } from '@c8y/ngx-components';
import { DemoProviderGuard } from './demo-provider.guard';

@NgModule({
  // important
  imports: [
    ProviderConfigurationModule.config([
      {
        navigation: {
          label: 'Demo provider',
          path: 'provider-configuration/provider-configuration-example',
          icon: 'bell-o',
          parent: 'Provider configuration',
          priority: 2,
          canActivate: [DemoProviderGuard]
        },
        layout: {
          pageTitle: 'Demo provider',
          cardTitle: 'Credentials',
          description:
            'You can provide your own text here, e.g. to explain the user what this provider does. If the dropdown below contains no providers you may have not configured your endpoints properly. Check in the Introduction section for a more detailed explanation on how to configure the module properly.',
          providerName: 'Demo provider',
          providerNamePlaceholder: 'Select or type to filter providers',
          providerNameNoMatchesHint: 'Select one of the existing providers.',
          deleteBtnLabel: 'Delete',
          saveBtnLabel: 'Save',
          configurationUpdatedSuccessMsg: 'Credentials updated.',
          deleteConfigurationModalTitle: 'Delete credentials',
          deleteConfigurationModalBody: `You are about to delete provider credentials. Do you want to proceed?`,
          deleteConfigurationModalOkBtnLabel: 'Delete',
          configurationDeletedSuccessMsg: 'Credentials deleted.'
        },
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
    ])
  ]
})
export class ProviderConfigurationTutorialModule {}
