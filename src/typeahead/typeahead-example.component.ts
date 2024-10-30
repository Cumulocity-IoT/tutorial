import { Component } from '@angular/core';
import { CoreModule, ForOfFilterPipe } from '@c8y/ngx-components';
import { IManagedObject, InventoryService, IResultList } from '@c8y/client';
import { pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'tut-typeahead-example',
  templateUrl: './typeahead-example.component.html',
  standalone: true,
  imports: [CoreModule]
})
export class TypeaheadExampleComponent {
  devices: IResultList<IManagedObject>;
  filterPipe: ForOfFilterPipe = pipe(tap());
  pattern = '';
  selectedDevice: IManagedObject;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  async loadDevices() {
    this.devices = await this.inventoryService.list({
      pageSize: 10,
      withTotalPages: true,
      fragmentType: 'c8y_IsDevice',
      currentPage: 1
    });
  }

  async reload() {
    await this.loadDevices();
  }

  setPipe(filterStr: string) {
    this.pattern = filterStr;
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
