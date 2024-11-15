import { Type } from '@angular/core';
import { BaseColumn, ColumnConfig, PartialFilterChipGenerationType } from '@c8y/ngx-components';
import { TypeCellRendererComponent } from './type.cell-renderer.component';
import { TypeFilteringFormRendererComponent } from './type.filtering-form-renderer.component';
import { TypeHeaderCellRendererComponent } from './type.header-cell-renderer.component';

const FILTER_TYPES = [
  { key: 'group', label: 'Group' },
  { key: 'device', label: 'Device' },
  { key: 'smartRule', label: 'Smart Rule' },
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'file', label: 'File' },
  { key: 'application', label: 'Application' }
];

/**
 * Defines a custom Type column with custom filtering form and chips generation.
 */
export class TypeDataGridColumn extends BaseColumn {
  readonly name = 'type';
  readonly header = 'Type';

  headerCellRendererComponent: Type<any> = TypeHeaderCellRendererComponent;
  cellRendererComponent: Type<any> = TypeCellRendererComponent;
  sortable = false;
  filterable = true;
  filteringFormRendererComponent: Type<any> = TypeFilteringFormRendererComponent;

  constructor(initialColumnConfig?: ColumnConfig) {
    super(initialColumnConfig);

    // Set the custom filtering configuration
    this.filteringConfig = {
      /**
       * Generates filter chips based on the selected filters in the model.
       * Each chip represents a filter and provides a way for users to visualize
       * and remove the applied filters.
       *
       * @param model An object with defined structure (e.g. by schema).
       * @returns return an array of partial filter chips with required properties 'displayValue' and 'value'.
       */
      generateChips: (model): PartialFilterChipGenerationType[] => {
        const chips = [];

        FILTER_TYPES.forEach(type => {
          if (model[type.key]) {
            chips.push({
              displayValue: type.label,
              value: type.key,
              remove: () => {
                delete model[type.key];
                return {
                  externalFilterQuery: { ...model },
                  columnName: this.name
                };
              }
            });
          }
        });

        return chips;
      },
      /**
       * Transforms a filtering config model (e.g. coming from schema form component) to a query object.
       * However, using schema form component is not necessary.
       * Model can be defined arbitrarily but must converted to a valid query object.
       * @param model An object with defined structure (e.g. by schema).
       * @returns A query object to be used to generate a query string (QueryUtils).
       */
      getFilter: model => {
        const filter: any = {};
        const ors = [];

        if (model.group) ors.push({ type: 'c8y_DeviceGroup' });
        if (model.device) ors.push({ __has: 'c8y_IsDevice' });
        if (model.smartRule)
          ors.push({ type: { __in: ['c8y_SmartRule', 'c8y_PrivateSmartRule'] } });
        if (model.dashboard) ors.push({ type: { __has: 'c8y_Dashboard' } });
        if (model.file) ors.push({ type: { __has: 'c8y_IsBinary' } });
        if (model.application) ors.push({ type: 'c8y_Application_*' });

        if (ors.length) filter.__or = ors;

        return filter;
      }
    };
  }
}
