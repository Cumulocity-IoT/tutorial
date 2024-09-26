import { CoreModule, StepperService, throttle } from '@c8y/ngx-components';
import { Component, OnInit } from '@angular/core';
import { IManagedObject, InventoryService, IResultList } from '@c8y/client';
import { RouterModule } from '@angular/router';

/**
 * The ListComponent shows how to generate a list.
 */
@Component({
  selector: 'list-virtual-scroll-check',
  templateUrl: './list-virtual-scroll-check.component.html',
  standalone: true,
  imports: [CoreModule, RouterModule],
  providers: [StepperService]
})
export class ListVirtualScrollCheckComponent implements OnInit {
  devices: IResultList<IManagedObject>;
  devicesContainerStrategy: IResultList<IManagedObject>;
  selected = { id: null, name: '' };
  checkAll;
  enableBasicList = false;
  dataMultiplier = 1;

  // The filter object will add query parameters
  // to the request which is made by the service.
  private filter: object = {
    fragmentType: 'c8y_IsDevice',
    // paging information will be a part of the response now
    withTotalPages: true,
    pageSize: 10
  };

  constructor(public inventory: InventoryService) {}

  ngOnInit(): void {
    this.loadDevicesContainerStrategy();
  }

  @throttle(500, { trailing: false })
  async loadDevicesContainerStrategy() {
    const filter: any = { ...this.filter };
    filter.pageSize = 2000;

    const items = await this.inventory.list(filter);

    // Let us simulate that we have very large amount of data to display:
    const template = [...items.data];
    while (items.data.length < this.dataMultiplier) {
      items.data.push(...template);
    }
    this.devicesContainerStrategy = items;
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
