import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DemoProviderGuard implements CanActivate {
  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
    return Promise.resolve(true);
  }
}
