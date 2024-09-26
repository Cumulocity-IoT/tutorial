import { Component } from '@angular/core';
// eslint-disable-next-line
import { CoreModule, LoginService } from '@c8y/ngx-components';

@Component({
  selector: 'app-logout-action',
  template: `<button class="main-header-button" title="Logout" type="button" (click)="logout()">
    <i class="icon-2x" c8yIcon="sign-out"></i>
  </button> `,
  standalone: true,
  imports: [CoreModule]
})
export class LogoutActionComponent {
  // Uncomment to see the effect.
  // constructor(private loginService: LoginService) {}

  logout() {
    console.log('Logout action triggered!');
    // Uncomment to see the effect.
    // this.loginService.logout();
  }
}
