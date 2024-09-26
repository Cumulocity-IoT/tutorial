import { Component } from '@angular/core';
import { CoreModule, ForOfFilterPipe } from '@c8y/ngx-components';
import { IManagedObject, InventoryService, IResultList } from '@c8y/client';
import { pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'c8y-for-of-example',
  templateUrl: './for-of-example.component.html',
  standalone: true,
  imports: [CoreModule]
})
export class ForOfExampleComponent {
  devices: IResultList<IManagedObject>;
  filterPipe: ForOfFilterPipe = pipe(tap());
  config = {
    loadMore: 'auto',
    filter: '',
    pageSize: 10,
    maxIterations: 12
  };

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  async loadDevices() {
    this.devices = await this.inventoryService.list({
      pageSize: this.config.pageSize,
      withTotalPages: true,
      fragmentType: 'c8y_IsDevice',
      currentPage: 1
    });
  }

  async reload() {
    await this.loadDevices();
    this.setPipe(this.config.filter);
  }

  setPipe(filterStr: string) {
    this.filterPipe = pipe(
      map((data: []) => {
        return data.filter(
          (mo: IManagedObject) =>
            mo.name && mo.name.toLowerCase().indexOf(filterStr.toLowerCase()) > -1
        );
      })
    );
  }
}
