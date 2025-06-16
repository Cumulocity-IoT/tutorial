import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RedirectToLastRouteGuardService {
  constructor(private router: Router) {}

  canActivate: CanActivateFn = () => {
    if (!this.router.config.length) {
      return false;
    }

    for (let i = this.router.config.length - 1; i >= 0; i--) {
      const route = this.router.config[i];
      if (!route.path || route.path.includes('pickLastRoute')) {
        continue;
      }

      this.router.navigate([route.path]);
      return false;
    }

    return false;
  };
}
