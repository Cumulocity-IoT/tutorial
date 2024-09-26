import { NgModule, inject } from '@angular/core';
import { CanActivateFn, RouterModule } from '@angular/router';
import { RedirectToLastRouteGuardService } from './redirect-to-last-route-guard.service';
import { EmptyComponent } from '@c8y/ngx-components';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pickLastRoute',
        canActivate: [
          ((...args) =>
            inject(RedirectToLastRouteGuardService).canActivate(...args)) as CanActivateFn
        ],
        component: EmptyComponent
      }
    ])
  ]
})
export class RedirectToLastRouteModule {}
