import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { hookUserMenu } from '@c8y/ngx-components';
import { CustomUserMenuFactory } from './custom-user-menu-factory.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    // Both examples will be shown in the right drawer user menu. Note that they will not be shown in codex.
    hookUserMenu(CustomUserMenuFactory),
    hookUserMenu({
      icon: 'user',
      label: 'Example 2',
      click: () => console.log('I am the second example'),
      priority: 100
    })
  ]
})
export class TutorialUserMenuModule {}
