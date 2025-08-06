import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CoreModule, FormsModule } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-extendable-input-list-example',
  template: `<c8y-title>Extendable input list Example</c8y-title>
    <div class="container-fluid p-24">
      <ul class="list-unstyled p-t-16" c8yInputGroupListContainer>
        <li class="m-b-8" *ngFor="let item of items; let i = index; trackBy: trackByFn">
          <c8y-input-group-list
            [attr.aria-label]="'Input group-' + (i + 1)"
            [index]="i"
            (onAdd)="add(); announceChange('Item added')"
            (onRemove)="remove(i); announceChange('Item removed')"
            [minus]="items.length > 1"
          >
            <c8y-form-group class="form-group--tooltip-validation">
              <label class="sr-only" [attr.for]="'extendable-input-' + i"
                >List item {{ i + 1 }}</label
              >
              <input
                class="form-control"
                [attr.aria-label]="'List item-' + (i + 1)"
                placeholder="e.g. placeholder"
                type="text"
                [required]="true"
                [(ngModel)]="items[i]"
              />
            </c8y-form-group>
          </c8y-input-group-list>
        </li>
      </ul>
      <!-- aria-live region for screen reader announcements -->
      <div class="sr-only" aria-live="polite" #liveRegion>{{ liveMessage }}</div>
    </div>`,
  standalone: true,
  imports: [CoreModule, FormsModule, CommonModule]
})
export class ExtendableInputListExampleComponent {
  items: string[] = [];
  liveMessage = '';

  ngOnInit() {
    this.add();
  }

  trackByFn(index: any, _item: any) {
    return index;
  }

  add() {
    this.items.push('');
  }

  remove(index) {
    this.items.splice(index, 1);
  }

  announceChange(message: string) {
    this.liveMessage = message;
    // Optionally clear the message after a short delay for repeated announcements
    setTimeout(() => {
      this.liveMessage = '';
    }, 1000);
  }
}
