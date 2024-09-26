import { Component } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';

interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'tut-pagination-example',
  template: `
    <div class="container-fluid">
      <c8y-title>Pagination</c8y-title>
      <c8y-list-group>
        <c8y-li *ngFor="let item of itemsToShow">
          {{ item.name }}
        </c8y-li>
        <c8y-li class="sticky-bottom">
          <pagination
            [totalItems]="totalItems"
            [(ngModel)]="currentPage"
            [itemsPerPage]="itemsPerPage"
            (pageChanged)="pageChanged($event)"
            previousText="previous"
            nextText="next"
          ></pagination>
        </c8y-li>
      </c8y-list-group>
    </div>
  `,
  standalone: true,
  imports: [CoreModule, PaginationModule]
})
export class PaginationExampleComponent {
  currentPage = 1;
  itemsPerPage = 10;
  // Items to display on the current page
  itemsToShow: Item[] = [];
  totalItems = 50;

  // Mock dataset
  private allItems: Item[] = Array.from({ length: this.totalItems }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`
  }));

  constructor() {
    this.updateItemsToShow();
  }

  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
    this.updateItemsToShow();
  }

  private updateItemsToShow(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.itemsToShow = this.allItems.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
