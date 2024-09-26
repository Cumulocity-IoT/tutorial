import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RedirectToLastRouteGuardService {
  constructor(private router: Router) {}

  canActivate: CanActivateFn = () => {
    if (!this.router.config.length) {
      return false;
    }
    const lastRoute = this.router.config[this.router.config.length - 1];
    this.router.navigate([lastRoute.path]);
    return false;
  };
}
