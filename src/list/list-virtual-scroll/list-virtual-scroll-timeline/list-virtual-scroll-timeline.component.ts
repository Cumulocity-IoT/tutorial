import { CoreModule, StepperService } from '@c8y/ngx-components';
import { Component, OnInit } from '@angular/core';
import { IManagedObject, InventoryService, IResultList } from '@c8y/client';
import { RouterModule } from '@angular/router';

/**
 * The ListComponent shows how to generate a list.
 */
@Component({
  selector: 'list-virtual-scroll-timeline',
  templateUrl: './list-virtual-scroll-timeline.component.html',
  standalone: true,
  imports: [CoreModule, RouterModule],
  providers: [StepperService]
})
export class ListVirtualScrollTimelineComponent implements OnInit {
  devices: IResultList<IManagedObject>;
  selected = { id: null, name: '' };
  checkAll;
  enableBasicList = false;

  // The filter object will add query parameters
  // to the request which is made by the service.
  private filter: object = {
    fragmentType: 'c8y_IsDevice',
    // paging information will be a part of the response now
    withTotalPages: true,
    pageSize: 10,
    currentPage: 1
  };

  constructor(public inventory: InventoryService) {}

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
      console.log('Not really deleting the device.');
    }
  }

  // triggered if a device is selected
  updateSelected(checked, device) {
    console.log(checked, device);
  }
}
