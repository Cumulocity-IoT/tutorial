import { Injectable } from '@angular/core';
import { transform } from 'lodash-es';

import { IManagedObject, InventoryService, QueriesUtil } from '@c8y/client';
import {
  ActionControl,
  BuiltInActionType,
  BulkActionControl,
  Column,
  Pagination
} from '@c8y/ngx-components';

import { assign, get, identity } from 'lodash-es';
import { LastUpdatedDataGridColumn } from './last-updated-data-grid-column/last-updated.data-grid-column';
import { TypeDataGridColumn } from './type-data-grid-column/type.data-grid-column';

/** Model for custom type filtering form. */
export interface TypeFilteringModel {
  group?: boolean;
  device?: boolean;
  smartRule?: boolean;
  dashboard?: boolean;
  file?: boolean;
  application?: boolean;
}

/**
 * This is the example service for a data grid:
 * provides the list of columns, initial pagination object, actions;
 * as well as performs the query for data based on the current grid setup.
 */
@Injectable()
export class ServerGridExampleService {
  /** This will be used to build the inventory queries. */
  protected queriesUtil: QueriesUtil;

  constructor(protected inventoryService: InventoryService) {
    this.queriesUtil = new QueriesUtil();
  }

  /**
   * Returns a list of columns.
   * We define 2 columns with inline objects (they display simple properties
   * and use default header, cell and filtring form).
   * The last column is defined via a class instance (it displays a value based on
   * several properties of the row item and has custom header, cell and filtering form).
   */
  getColumns(): Column[] {
    const columns = [
      {
        name: 'id',
        header: 'ID',
        path: 'id',
        filterable: true,
        sortable: true
      },
      {
        name: 'name',
        header: 'Name',
        path: 'name',
        filterable: true,
        sortable: true
      },
      new TypeDataGridColumn(),
      new LastUpdatedDataGridColumn()
    ];

    return columns;
  }

  /** Returns initial pagination object. */
  getPagination(): Pagination {
    return {
      pageSize: 10,
      currentPage: 1
    };
  }

  /** Returns an array of individual row actions. */
  getActionControls(): ActionControl[] {
    return [
      { type: BuiltInActionType.Edit, callback: item => console.dir(item) },
      { type: BuiltInActionType.Export, callback: item => console.dir(item) },
      { type: BuiltInActionType.Delete, callback: item => console.dir(item) },
      {
        type: 'customAction',
        icon: 'online',
        text: 'Custom action',
        callback: item => console.dir(item)
      }
    ];
  }

  /** Returns an array of bulk row actions. */
  getBulkActionControls(): BulkActionControl[] {
    return [
      {
        type: BuiltInActionType.Export,
        callback: selectedItemIds => console.dir(selectedItemIds)
      },
      {
        type: BuiltInActionType.Delete,
        callback: selectedItemIds => console.dir(selectedItemIds)
      },
      {
        type: 'customAction',
        icon: 'online',
        iconClasses: 'm-r-4',
        text: 'Custom action',
        showIf: selectedItemIds => selectedItemIds?.every(id => Number.parseInt(id) % 2 === 0),
        callback: selectedItemIds => console.dir(selectedItemIds)
      }
    ];
  }

  /** Returns data for current columns and pagination setup. */
  async getData(columns: Column[], pagination: Pagination) {
    // build filters based on columns and pagination
    const filters = this.getFilters(columns, pagination);
    // execute inventory query for the list of managed objects
    return this.inventoryService.list(filters);
  }

  /** Returns the number of items matching current columns and pagination setup. */
  async getCount(columns: Column[], pagination: Pagination) {
    const filters = {
      ...this.getFilters(columns, pagination),
      withTotalElements: true
    };
    return (await this.inventoryService.list(filters)).paging.totalElements;
  }

  /** Returns the total number of items (with no filters). */
  async getTotal(): Promise<number> {
    const filters = {
      withTotalElements: true
    };
    return (await this.inventoryService.list(filters)).paging.totalElements;
  }

  /** Returns an icon and label representing the type of the managed object. */
  getTypeIconAndLabel(mo: IManagedObject): { icon: string; label: string } {
    let icon = 'question';
    let label = 'Other';

    if (mo.type === 'c8y_DeviceGroup') {
      icon = 'c8y-group';
      label = 'Group';
    }

    if (mo.c8y_IsDevice !== undefined) {
      icon = 'exchange';
      label = 'Device';
    }

    if (mo.type === 'c8y_SmartRule' || mo.type === 'c8y_PrivateSmartRule') {
      icon = 'c8y-smart-rules';
      label = 'Smart rule';
    }

    if (mo.c8y_Dashboard !== undefined) {
      icon = 'th';
      label = 'Dashboard';
    }

    if (mo.c8y_IsBinary !== undefined) {
      icon = 'file';
      label = 'File';
    }

    if (mo.type && mo.type.startsWith('c8y_Application')) {
      icon = 'c8y-atom';
      label = 'Application';
    }

    return { icon, label };
  }

  /** Returns filters for given columns and pagination setup. */
  private getFilters(columns: Column[], pagination: Pagination) {
    return {
      query: this.getQueryString(columns),
      pageSize: pagination.pageSize,
      currentPage: pagination.currentPage,
      withChildren: false,
      withTotalPages: true
    };
  }

  /** Returns a query string based on columns setup. */
  private getQueryString(columns: Column[]): string {
    const fullQuery = this.getQueryObj(columns);
    return this.queriesUtil.buildQuery(fullQuery);
  }

  /** Returns a query object based on columns setup. */
  private getQueryObj(columns: Column[], defaultFilter = {}): any {
    return transform(columns, (query, column) => this.addColumnQuery(query, column), {
      __filter: {},
      __orderby: [],
      ...defaultFilter
    });
  }

  /** Extends given query with a part based on the setup of given column. */
  private addColumnQuery(query: any, column: Column): void {
    // when a column is marked as filterable
    if (column.filterable) {
      // in the case of default filtering form, `filterPredicate` will contain the string entered by a user
      if (column.filterPredicate) {
        // so we use it as the expected value, * allow to search for it anywhere in the property
        query.__filter[column.path] = `*${column.filterPredicate}*`;
      }

      // in the case of custom filtering form, we're storing the query in `externalFilterQuery.query`
      if (column.externalFilterQuery) {
        const getFilter = column.filteringConfig.getFilter || identity;
        const queryObj = getFilter(column.externalFilterQuery);

        if (queryObj.__or) {
          query.__filter.__and = query.__filter.__and || [];
          query.__filter.__and.push(queryObj);
        } else if (queryObj.__and && get(query, '__filter.__and')) {
          queryObj.__and.map(obj => query.__filter.__and.push(obj));
        } else {
          assign(query.__filter, queryObj);
        }
      }
    }

    // when a column is sortable and has a specified sorting order
    if (column.sortable && column.sortOrder) {
      // add sorting condition for the configured column `path`
      query.__orderby.push({
        [column.path]: column.sortOrder === 'asc' ? 1 : -1
      });
    }

    return query;
  }
}
