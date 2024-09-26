import { Component } from '@angular/core';
import { IManagedObject, InventoryService, IResultList } from '@c8y/client';
import { CoreModule } from '@c8y/ngx-components';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'list-check',
  templateUrl: './list-check.component.html',
  standalone: true,
  imports: [CoreModule, RouterModule, CommonModule]
})
export class ListCheckComponent implements OnInit {
  devices: IResultList<IManagedObject>;
  loadedDevices: IManagedObject[] = [];
  selected$: BehaviorSubject<IManagedObject[]> = new BehaviorSubject([]);

  // The filter object will add query parameters
  // to the request which is made by the service.
  private filter: object = {
    fragmentType: 'c8y_IsDevice',
    // paging information will be a part of the response now
    withTotalPages: true,
    pageSize: 10,
    currentPage: 1
  };

  isIndeterminate$ = this.selected$.pipe(
    map(selected => {
      return !(selected.length === 0 || selected.length === this.loadedDevices.length);
    })
  );

  constructor(public inventory: InventoryService) {}

  itemsChange(newItems: IManagedObject[]) {
    this.loadedDevices.push(...newItems);
    // trigger the isIndeterminate$ observable
    this.selected$.next([...this.selected$.value]);
  }

  checkAll(checked) {
    if (!checked) {
      this.selected$.next([]);
      return;
    }
    this.selected$.next([...this.loadedDevices]);
  }

  isSelected(device: IManagedObject) {
    return this.selected$.value.some(d => d.id === device.id);
  }

  ngOnInit(): void {
    this.loadDevices();
  }

  // Promise-based usage of InventoryService.
  async loadDevices() {
    this.devices = await this.inventory.list(this.filter);
  }

  // Delete a managedObject (as device) with given id from database.
  async deleteDevice(id: string) {
    if (id && id.length > 0) {
      await this.inventory.delete(id);
      this.loadDevices();
    }
  }

  // triggered if a device is selected
  updateSelected(checked, device) {
    const selected = this.selected$.value;
    const index = selected.findIndex(d => d.id === device.id);
    if (checked && index === -1) {
      this.selected$.next([...selected, device]);
      return;
    } else if (!checked && index > -1) {
      selected.splice(index, 1);
      this.selected$.next(selected);
    }
  }
}
