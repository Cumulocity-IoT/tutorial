import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { BottomDrawerRef } from '@c8y/ngx-components';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tut-bottom-drawer-content-example',
  templateUrl: './bottom-drawer-content-example.component.html',
  standalone: true,
  host: {
    class: 'd-contents'
  }
})
export class BottomDrawerContentExampleComponent implements OnInit, OnDestroy {
  bottomDrawerRef = inject(BottomDrawerRef);
  isDisabled = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  result: Promise<string> = new Promise((resolve, reject) => {
    this._save = resolve;
    this._cancel = reject;
  });

  private _save: (value: string) => void;
  private _cancel: (reason?: any) => void;

  ngOnInit() {
    this.bottomDrawerRef.onClosed$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this._cancel('Drawer closed');
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  cancel() {
    this._cancel('User canceled');
    this.bottomDrawerRef.close();
  }

  save() {
    this._save('Value to pass back.');
    this.bottomDrawerRef.close();
  }
}
