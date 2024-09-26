import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActionControl, BuiltInActionType, Column, CoreModule } from '@c8y/ngx-components';
import { DeviceGridModule } from '@c8y/ngx-components/device-grid';

@Component({
  selector: 'c8y-empty-grid-example',
  templateUrl: './empty-grid-example.component.html',
  standalone: true,
  imports: [CoreModule, DeviceGridModule, RouterModule]
})
export class EmptyGridExampleComponent {
  /** This will be used as a title for the data grid. */
  title = 'Devices';
  /**
   * This defines what columns will be displayed in the grid.
   * In this example we're just displaying properties from the items from the loaded data file.
   */
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
  /**
   * Defines actions for individual rows.
   * `type` can be one of the predefined ones, or a custom one.
   * `callback` executes the action (based on the selected item object).
   */
  actionControls: ActionControl[] = [
    {
      type: BuiltInActionType.Delete,
      callback: selectedItem => this.onItemDelete(selectedItem)
    }
  ];

  /** Executes a delete action on the selected item. */
  onItemDelete(selectedItem) {
    console.log('item to delete:');
    console.dir(selectedItem);
  }
}
