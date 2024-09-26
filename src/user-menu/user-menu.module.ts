import { NgModule } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { ExampleUserMenu } from './user-menu';

@NgModule({
  declarations: [],
  imports: [CoreModule],
  providers: [ExampleUserMenu]
})
export class UserMenuModule {
  // use dependency injection as otherwise ExampleUserMenu will never be instantiated
  constructor(private userMenu: ExampleUserMenu) {}
}
