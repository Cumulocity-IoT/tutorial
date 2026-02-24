import { Component, inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { BottomDrawerRef, BottomDrawerService } from '@c8y/ngx-components';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BottomDrawerContentTopExampleComponent } from './bottom-drawer-content-top-example.component';

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
  title = 'First bottom drawer title';
  destroy$: Subject<boolean> = new Subject<boolean>();

  result: Promise<string> = new Promise((resolve, reject) => {
    this._save = resolve;
    this._cancel = reject;
  });

  private _save: (value: string) => void;
  private _cancel: (reason?: any) => void;
  bottomDrawerService = inject(BottomDrawerService);

  @HostListener('document:keydown.escape', ['$event'])
  async onEscapePress(event: Event) {
    if (this.bottomDrawerService.isTop(this.bottomDrawerRef)) {
      event.preventDefault();
      await this.bottomDrawerRef.close();
      console.log(
        'Escape pressed- first bottom drawer closed, handled by BottomDrawerContentExampleComponent'
      );
    }
  }

  ngOnInit() {
    this.bottomDrawerRef.onClosed$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this._cancel('Drawer closed');
    });
  }

  async openTopDrawer() {
    const drawer = this.bottomDrawerService.openDrawer(BottomDrawerContentTopExampleComponent, {
      initialState: {
        // place here any content you want to pass to the component
        isDisabled: true
      },
      disableClickOutside: true
      // closeOnEscape is true by default
    });

    try {
      const _resultOf = await drawer.instance.result;
    } catch (ex) {
      //
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
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
