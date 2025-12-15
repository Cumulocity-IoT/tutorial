import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CoreModule, RouterModule, VersionModule } from '@c8y/ngx-components';
import { provideHelloSample } from '../hello';
import { provideRouteSample } from '../hooks/route';
import { provideDemoWidget } from '../widget';
import { provideHooksSample } from '../hooks';
import { provideHooksNavigatorSample } from '../hooks/navigator';
import { provideListsSampleNavigator } from '../list';
import { provideGridSampleNode } from '../grids';
import { provideLazySample } from '../lazy';
import { provideProviderConfigurationIntroduction } from '../provider-configuration/introduction-example';
import { provideDynamicFormsNavigator } from '../dynamic-forms';
import { provideWidgetsResolverSample } from '../widget-resolvers';
import { provideMapExampleNavigator } from '../maps';
import { provideTranslationsNavigator } from '../translations';
import { provideLazyWidget } from '../lazy-widget';
import { provideBreadcrumbsNavigator } from '../breadcrumbs';
import { provideSplitViewSamples } from '../split-view';
import { provideIconPanelExample } from '../icon-panel';
import { provideClientInterceptorSample } from '../client-interceptor';
import { provideUserMenuSample } from '../user-menu';
import { AlarmsModule } from '@c8y/ngx-components/alarms';
import { BulkOperationSchedulerModule } from '@c8y/ngx-components/operations/bulk-operation-scheduler';
import { provideRedirectToLastRoute } from '../redirect-to-last-route';
import { provideAPIMock } from '../__mocks';
import { configureWidgetProviders } from '@c8y/ngx-components/widgets/widget-providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(RouterModule.forRoot()),
    importProvidersFrom(CoreModule.forRoot()),
    // The following modules show examples of how to
    ...provideHelloSample(),
    ...provideRouteSample(),
    ...provideDemoWidget(),
    ...provideHooksSample(),
    ...provideHooksNavigatorSample(),
    ...provideListsSampleNavigator(),
    ...provideGridSampleNode(),
    ...provideLazySample(),
    importProvidersFrom(BulkOperationSchedulerModule),
    ...provideProviderConfigurationIntroduction(),
    ...provideDynamicFormsNavigator(),
    ...provideWidgetsResolverSample(),
    ...provideUserMenuSample(),
    ...provideClientInterceptorSample(),
    ...provideMapExampleNavigator(),
    ...provideTranslationsNavigator(),
    // Get rid of a default version factory
    importProvidersFrom(VersionModule.config({ disableWebSDKPluginVersionFactory: true })),
    ...provideLazyWidget(),
    ...configureWidgetProviders(),
    ...provideRedirectToLastRoute(),
    ...provideAPIMock(),
    ...provideBreadcrumbsNavigator(),
    ...provideSplitViewSamples(),
    ...provideIconPanelExample(),
    importProvidersFrom(AlarmsModule.config({ hybrid: false }))
  ]
};
