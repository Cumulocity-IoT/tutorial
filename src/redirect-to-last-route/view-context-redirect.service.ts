import { inject, Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, DeviceService, ViewContext, ViewContextServices } from '@c8y/ngx-components';
import { SERVICE_FRAGMENT } from '@c8y/ngx-components/services/shared';

@Injectable({ providedIn: 'root' })
export class ViewContextRedirectService {
  constructor(
    private router: Router,
    private alert: AlertService
  ) {}

  async redirectToFirstItemOf(viewContext: ViewContext, subPath = ''): Promise<boolean> {
    const service = this.getServiceForViewContext(viewContext);
    const filter = this.getFilterForViewContext(viewContext);
    let firstEntry: Awaited<ReturnType<(typeof service)['list']>>['data'][0];
    try {
      const { data } = await service.list(filter);
      [firstEntry] = data;
      if (!firstEntry) {
        const message = `No entry present for context: "${viewContext}" in this tenant.`;
        throw Error(message);
      }
    } catch (e) {
      this.alert.warning(e);
      console.warn(e);
      return false;
    }

    const baseRoute = viewContext.replace(':id', `${firstEntry.id}`);
    this.router.navigate([baseRoute, subPath]);
    return false;
  }

  private getFilterForViewContext(viewContext: ViewContext) {
    switch (viewContext) {
      case ViewContext.Device: {
        return { query: `has(${DeviceService.DEVICE_FRAGMENT_TYPE})` } as const;
      }
      case ViewContext.Group: {
        return { query: 'has(c8y_IsDeviceGroup)' } as const;
      }
      case ViewContext.Service: {
        return { query: `type eq ${SERVICE_FRAGMENT}` } as const;
      }
    }
  }

  private getServiceForViewContext(viewContext: ViewContext) {
    const serviceClass = ViewContextServices.contextToService(viewContext);
    return inject(serviceClass as Type<InstanceType<typeof serviceClass>>);
  }
}
