import { NgModule } from '@angular/core';
import { ViewContext, hookRoute } from '@c8y/ngx-components';
import { RandomGuard } from './random.guard';

/**
 * Route hooks allow you to use routes as child routes on a ViewContext. If used with a context
 * the particular data is resolved automatically and the page is extended by a tab. Contexts
 * are currently Application, Device, Group, Tenant and User. Note: All components used here
 * needs to be used as EntryComponent!
 * This example will add a device tab with all the context information as well as a randomly
 * guarded context tab.
 *
 */
const routeHooks = [
  hookRoute([
    {
      path: 'context',
      context: ViewContext.Device,
      loadComponent: () =>
        import('./device/device-tab-context.component').then(m => m.DeviceTabContextComponent),
      label: 'Context',
      priority: 1000,
      icon: 'bell'
    },
    {
      path: 'info',
      context: ViewContext.Device,
      loadComponent: () =>
        import('./device/device-info.component').then(m => m.DeviceInfoComponent),
      label: 'Info',
      priority: 0,
      icon: 'info',
      /**
       * An example of an route guard which randomly activates
       * the child route. See Guards documentation from Angular
       * for more details.
       */
      canActivate: [RandomGuard]
    }
  ])
];

@NgModule({
  declarations: [],
  imports: [],
  /**
   * Adding the hooks to the providers:
   */
  providers: [...routeHooks]
})
export class RouteModule {}
