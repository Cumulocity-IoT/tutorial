import { Component, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  ActionControl,
  BulkActionControl,
  Column,
  CoreModule,
  DataSourceModifier,
  DATA_GRID_CONFIGURATION_CONTEXT_PROVIDER,
  DATA_GRID_CONFIGURATION_STRATEGY,
  DisplayOptions,
  GridConfig,
  GridConfigContext,
  GridConfigContextProvider,
  LoadMoreMode,
  Pagination,
  Row,
  ServerSideDataResult
} from '@c8y/ngx-components';
import { DeviceGridModule } from '@c8y/ngx-components/device-grid';
import { ServerGridExampleService } from './server-grid-example.service';
import { TypeCellRendererComponent } from './type-data-grid-column/type.cell-renderer.component';
import { TypeFilteringFormRendererComponent } from './type-data-grid-column/type.filtering-form-renderer.component';
import { TypeHeaderCellRendererComponent } from './type-data-grid-column/type.header-cell-renderer.component';
import { VoidConfigurationStrategy } from './void-configuration-strategy';

/**
 * This is an example of using DataGridComponent for displaying, filtering and sorting managed objects
 * using customized columns and dynamically built inventory queries.
 */
@Component({
  selector: 'c8y-server-grid-example',
  templateUrl: './server-grid-example.component.html',
  standalone: true,
  imports: [
    CoreModule,
    DeviceGridModule,
    RouterModule,
    TypeCellRendererComponent,
    TypeFilteringFormRendererComponent,
    TypeHeaderCellRendererComponent
  ],
  providers: [
    ServerGridExampleService,
    {
      provide: DATA_GRID_CONFIGURATION_STRATEGY,
      useClass: VoidConfigurationStrategy
    },
    {
      provide: DATA_GRID_CONFIGURATION_CONTEXT_PROVIDER,
      useExisting: ServerGridExampleComponent
    }
  ]
})
export class ServerGridExampleComponent implements GridConfigContextProvider {
  title = 'Managed objects';
  loadMoreItemsLabel = 'Load more managed objects';
  loadingItemsLabel = 'Loading managed objects…';

  displayOptions: DisplayOptions = {
    bordered: true,
    striped: true,
    filter: true,
    gridHeader: true,
    hover: true
  };

  columns: Column[] = this.service.getColumns();
  pagination: Pagination = this.service.getPagination();
  infiniteScroll: LoadMoreMode = 'auto';
  serverSideDataCallback: any;

  refresh: EventEmitter<any> = new EventEmitter<any>();

  selectable = true;
  actionControls: ActionControl[] = this.service.getActionControls();
  bulkActionControls: BulkActionControl[] = this.service.getBulkActionControls();

  constructor(private service: ServerGridExampleService) {
    // we're setting up `serverSideDataCallback` to execute a method from this component with bound `this`
    this.serverSideDataCallback = this.onDataSourceModifier.bind(this);
    // we're setting up `onRefreshClick` to be executed on refresh event
    this.refresh.subscribe(() => this.onRefreshClick());
  }

  getGridConfigContext(): GridConfigContext {
    return {
      /**
       * You can provide data here that can be used for grid configration storage,
       * action control matchers, etc.
       */
      key: 'server-grid-example'
    };
  }

  /** Used in ngFor for columns iteration. */
  trackByName(_index, column: Column): string {
    return column.name;
  }

  /**
   * This method loads data when data grid requests it (e.g. on initial load or on column settings change).
   * It gets the object with current data grid setup and is supposed to return:
   * full response, list of items, paging object, the number of items in the filtered subset, the number of all items.
   */
  async onDataSourceModifier(
    dataSourceModifier: DataSourceModifier
  ): Promise<ServerSideDataResult> {
    const { res, data, paging } = await this.service.getData(
      dataSourceModifier.columns,
      dataSourceModifier.pagination
    );
    const filteredSize: number = await this.service.getCount(
      dataSourceModifier.columns,
      dataSourceModifier.pagination
    );
    const size: number = await this.service.getTotal();

    const serverSideDataResult: ServerSideDataResult = { res, data, paging, filteredSize, size };

    return serverSideDataResult;
  }

  /** Executes an action on row click. */
  onRowClick(row: Row) {
    console.log('row clicked:');
    console.dir(row);
  }

  /** Executes an action on the selected items. */
  onItemsSelect(selectedItemIds: string[]) {
    console.log('selected item ids:');
    console.dir(selectedItemIds);
  }

  /** Executes an action on grid config change. */
  onConfigChange(gridConfig: GridConfig) {
    console.log('grid config changed:');
    console.dir(gridConfig);
  }

  /** Executes an action on refresh event. */
  onRefreshClick() {
    console.log('refresh clicked');
  }
}
