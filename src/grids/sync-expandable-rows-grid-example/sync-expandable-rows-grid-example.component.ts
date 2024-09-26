import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActionControl, DisplayOptions, Column, CoreModule, Pagination } from '@c8y/ngx-components';
import { DeviceGridModule } from '@c8y/ngx-components/device-grid';
import { getData } from '../client-grid-example/data';
import { SyncExpandableRowsComponent } from './sync-expandable-rows-example.component';

@Component({
  selector: 'c8y-sync-expandable-rows-grid-example',
  templateUrl: './sync-expandable-rows-grid-example.component.html',
  standalone: true,
  imports: [CoreModule, DeviceGridModule, RouterModule, SyncExpandableRowsComponent]
})
export class SyncExpandableRowsGridComponent implements OnInit {
  /** This will be used as a title for the data grid. */
  title = 'Devices';

  displayOptions: DisplayOptions = {
    bordered: false,
    striped: true,
    filter: true,
    gridHeader: true,
    hover: false
  };
  columns: Column[] = [
    {
      name: 'id',
      header: 'ID',
      path: 'id',
      filterable: true
    },
    {
      name: 'name',
      header: 'Name',
      path: 'name',
      filterable: true
    },
    {
      name: 'type',
      header: 'Type',
      path: 'type',
      filterable: true
    },
    {
      name: 'creationTime',
      header: 'Creation time',
      path: 'creationTime',
      filterable: true
    },
    {
      name: 'lastUpdated',
      header: 'Last updated',
      path: 'lastUpdated',
      filterable: true
    },
    {
      name: 'owner',
      header: 'Owner',
      path: 'owner',
      filterable: true
    }
  ];
  actionControls: ActionControl[] = [];
  pagination: Pagination = {
    pageSize: 30,
    currentPage: 1
  };
  selectable = true;
  data: any[];

  ngOnInit() {
    this.data = getData();
  }

  onItemsSelect(selectedItemIds) {
    console.log('selected items:');
    console.dir(selectedItemIds);
  }

  onFilter(filter) {
    console.log('filter changed:');
    console.log(filter);
  }
}
