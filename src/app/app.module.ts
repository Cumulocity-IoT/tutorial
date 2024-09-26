import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapComponent, CoreModule, RouterModule, VersionModule } from '@c8y/ngx-components';
import { BulkOperationSchedulerModule } from '@c8y/ngx-components/operations/bulk-operation-scheduler';
import { WidgetsModule } from '@c8y/ngx-components/widgets';
import { cockpitDefaultWidgets } from '@c8y/ngx-components/widgets/cockpit';
import { deviceManagementDefaultWidgets } from '@c8y/ngx-components/widgets/device-management';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClientInterceptorModule } from '../client-interceptor';
import { DynamicFormsTutorialModule } from '../dynamic-forms';
import { GridsModule } from '../grids';
import { HelloModule } from '../hello';
import { HooksModule } from '../hooks';
import { NavigatorModule } from '../hooks/navigator';
import { RouteModule } from '../hooks/route';
import { LazyRoutingModule } from '../lazy';
import { LazyWidgetModule } from '../lazy-widget';
import { ListsModule } from '../list';
import { MapExamplesModule } from '../maps/map-examples.module';
import { RedirectToLastRouteModule } from '../redirect-to-last-route';
import { UserMenuModule } from '../user-menu';
import { DashboardWidgetDemoModule } from '../widget';
import { WidgetResolversModule } from '../widget-resolvers';
import { MockModule } from '../__mocks';
import { IntroductionModule } from '../provider-configuration';
import { TranslationsModule } from '../translations';
import { DashboardTabsModule } from '../dashboard-tabs';
import { BreadcrumbsNodeModule } from '../breadcrumbs/breadcrumbs.module';
import { AlarmsModule } from '@c8y/ngx-components/alarms';

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    // Import the CoreModule to add c8y functionality
    CoreModule.forRoot(),

    // The following modules show examples of how to
    HelloModule,
    RouteModule,
    DashboardWidgetDemoModule,
    HooksModule,
    NavigatorModule,
    ListsModule,
    GridsModule,
    LazyRoutingModule,
    BulkOperationSchedulerModule,
    IntroductionModule,
    DynamicFormsTutorialModule,
    WidgetResolversModule,
    UserMenuModule,
    ClientInterceptorModule,
    MapExamplesModule,
    TranslationsModule,
    // Get rid of a default version factory
    VersionModule.config({ disableWebSDKPluginVersionFactory: true }),
    LazyWidgetModule,
    WidgetsModule.config({
      widgets: [...cockpitDefaultWidgets, ...deviceManagementDefaultWidgets]
    }),
    RedirectToLastRouteModule,
    MockModule,
    DashboardTabsModule,
    BreadcrumbsNodeModule,
    AlarmsModule.config({ hybrid: false })
  ],

  providers: [BsModalRef],

  /**
   * Bootstrap your application with the BootstrapComponent which will use the `<c8y-bootstrap>`
   * component to initialize the root application. Alternatively you can bootstrap
   * a component of your choice and include that tag into its template or only reuse the given components
   */
  bootstrap: [BootstrapComponent]
})
export class AppModule {}
