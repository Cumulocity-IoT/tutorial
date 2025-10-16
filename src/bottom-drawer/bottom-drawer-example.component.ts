import { Component, inject } from '@angular/core';
import { AlertService, BottomDrawerService, CoreModule } from '@c8y/ngx-components';
import { BottomDrawerContentExampleComponent } from './bottom-drawer-content-example.component';

@Component({
  selector: 'tut-bottom-drawer-example',
  templateUrl: './bottom-drawer-example.component.html',
  standalone: true,
  imports: [CoreModule]
})
export class BottomDrawerExampleComponent {
  bottomDrawerService = inject(BottomDrawerService);
  alertService = inject(AlertService);
  isOpen = false;

  async openDrawer() {
    this.isOpen = true;
    const drawer = this.bottomDrawerService.openDrawer(BottomDrawerContentExampleComponent, {
      initialState: {
        // place here any content you want to pass to the component
        isDisabled: true
      },
      disableClickOutside: true
    });

    try {
      const resultOf = await drawer.instance.result;
      this.alertService.success(resultOf);
    } catch (ex) {
      this.alertService.danger('Canceled as of: ' + ex);
    }
    this.isOpen = false;
  }
}
