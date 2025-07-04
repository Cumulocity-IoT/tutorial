import { Component, inject } from '@angular/core';
import { BottomDrawerRef } from '@c8y/ngx-components';

@Component({
  selector: 'tut-bottom-drawer-content-example',
  templateUrl: './bottom-drawer-content-example.component.html',
  standalone: true,
  host: {
    class: 'd-contents'
  }
})
export class BottomDrawerContentExampleComponent {
  bottomDrawerRef = inject(BottomDrawerRef);
  isDisabled = false;

  result: Promise<string> = new Promise((resolve, reject) => {
    this._save = resolve;
    this._cancel = reject;
  });

  private _save: (value: string) => void;
  private _cancel: (reason?: any) => void;

  cancel() {
    this._cancel('User canceled');
    this.bottomDrawerRef.close();
  }

  save() {
    this._save('Value to pass back.');
    this.bottomDrawerRef.close();
  }
}
