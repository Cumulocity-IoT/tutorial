import { EmptyComponent, hookRoute } from '@c8y/ngx-components';
import { RedirectToLastRouteGuardService } from './redirect-to-last-route-guard.service';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export function provideRedirectToLastRoute() {
  return [
    hookRoute({
      path: 'pickLastRoute',
      canActivate: [
        ((...args) => inject(RedirectToLastRouteGuardService).canActivate(...args)) as CanActivateFn
      ],
      component: EmptyComponent
    })
  ];
}
