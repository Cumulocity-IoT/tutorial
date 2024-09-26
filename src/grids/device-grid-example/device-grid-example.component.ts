import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  Column,
  CoreModule,
  CustomColumn,
  DATA_GRID_CONFIGURATION_CONTEXT_PROVIDER,
  DATA_GRID_CONFIGURATION_STRATEGY,
  gettext,
  GridConfigContext,
  GridConfigContextProvider
} from '@c8y/ngx-components';
import { DeviceGridModule, DeviceGridService } from '@c8y/ngx-components/device-grid';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { find } from 'lodash-es';
import { DeviceGridExampleConfigurationStrategy } from './device-grid-example-configuration-strategy';

@Component({
  selector: 'c8y-device-grid-example',
  templateUrl: './device-grid-example.component.html',
  standalone: true,
  imports: [CoreModule, DeviceGridModule, RouterModule],
  providers: [
    DeviceGridService,
    /* Providing DATA_GRID_CONFIGURATION_STRATEGY defines how grid configuration
     * should be persisted. You can use existing implementations like
     * `UserPreferencesConfigurationStrategy` or implement your own.
     */
    {
      provide: DATA_GRID_CONFIGURATION_STRATEGY,
      useClass: DeviceGridExampleConfigurationStrategy
    },
    /* Providing a DATA_GRID_CONFIGURATION_CONTEXT_PROVIDER gives you the flexibility
     * to persist configurations based on various criteria at runtime - device type,
     * current user, group, etc.
     * By default all configurable options in a grid are persisted. You can exlude
     * specific options (pagination, filters, sorting, etc.) by defining `GridConfigFilter`
     * in your context.
     * Alternatevely, in simpler scenarios you can provide a static context
     * with DATA_GRID_CONFIGURATION_CONTEXT and `useValue`.
     */
    {
      provide: DATA_GRID_CONFIGURATION_CONTEXT_PROVIDER,
      useExisting: DeviceGridExampleComponent
    }
  ]
})
export class DeviceGridExampleComponent implements GridConfigContextProvider {
  readonly withPersistedConfigExampleLabel =
    'Standard columns with configuration persisted in local storage';
  examples: Array<{ label: string; columns: Column[] }>;
  selectedExample;
  columnsInput: Column[];

  constructor(protected deviceGridService: DeviceGridService) {
    this.examples = [
      this.getExampleWithStandardColumns(),
      this.getExampleWithStandardColumnsAndSavedFilteringSorting(),
      this.getExampleWithCustomColumnAndPredefinedFiltering(),
      this.getExampleWithCustomColumnAndCustomValidator(),
      this.getExampleWithStandardColumnsAndPersistedConfiguration()
    ];
    this.selectExample(this.examples[0]);
  }

  getGridConfigContext(): GridConfigContext {
    return {
      key:
        this.selectedExample.label === this.withPersistedConfigExampleLabel
          ? 'example-device-grid'
          : null
    };
  }

  getExampleWithStandardColumns() {
    const columns = this.deviceGridService.getDefaultColumns();
    return {
      label: 'Standard columns',
      columns
    };
  }

  getExampleWithStandardColumnsAndSavedFilteringSorting() {
    const columns = this.deviceGridService.getDefaultColumns();
    const nameColumn = find(columns, { name: 'name' });
    nameColumn.externalFilterQuery = {
      names: ['*Temp*']
    };
    nameColumn.sortOrder = 'desc';
    return {
      label: 'Standard columns with saved filtering/sorting',
      columns
    };
  }

  getExampleWithCustomColumnAndPredefinedFiltering() {
    const columns = this.deviceGridService.getDefaultColumns();
    const typeColumn = new CustomColumn();
    typeColumn.name = 'type';
    typeColumn.path = 'type';
    typeColumn.header = gettext('Type');
    typeColumn.externalFilterQuery = {
      equals: ['c8y_MQTTDevice']
    };
    columns.splice(2, 0, typeColumn);
    return {
      label: 'Standard columns with custom one with predefined filtering',
      columns
    };
  }

  getExampleWithCustomColumnAndCustomValidator() {
    const columns = this.deviceGridService.getDefaultColumns();
    const nameColumn = columns.find(column => column.name === 'name');

    nameColumn.filteringConfig.fields = [
      {
        key: 'name',
        type: 'array',
        defaultValue: [''],
        templateOptions: {
          required: true,
          addText: 'Add next`name`'
        },
        fieldArray: {
          type: 'string',
          templateOptions: {
            required: true,
            label: 'Show items with name',
            tooltip: 'Use * as a wildcard character',
            placeholder: 'My device`DEVICE_NAME`'
          },
          validators: {
            minLength: {
              expression: (c: AbstractControl) => c.value.length >= 3,
              message: (error: any, field: FormlyFieldConfig) =>
                `value "${field.formControl.value}" is too short. min length is 3 characters`
            },
            maxLength: {
              expression: (c: AbstractControl) => c.value.length <= 6,
              message: (error: any, field: FormlyFieldConfig) =>
                `value "${field.formControl.value}" is too long. max length is 6 characters `
            },
            regexExampleValidator: {
              expression: (c: AbstractControl) => /foo/.test(c.value),
              message: (error: any, field: FormlyFieldConfig) =>
                `value "${field.formControl.value}" must contain "foo"`
            }
          }
        }
      }
    ];

    return {
      label: 'Standard columns with custom validators for "Name" column\'s filter',
      columns
    };
  }

  getExampleWithStandardColumnsAndPersistedConfiguration() {
    const columns = this.deviceGridService.getDefaultColumns();
    return {
      label: this.withPersistedConfigExampleLabel,
      columns
    };
  }

  selectExample(example) {
    this.selectedExample = example;
    this.columnsInput = example.columns;
  }

  onColumnsChange(columns: Column[]): void {
    // the columns list contains the current setup of the columns in the grid:

    // eslint-disable-next-line no-console
    console.log({ columns });
  }

  onDeviceQueryStringChange(deviceQueryString: string): void {
    // the query string is based on currently selected filters and sorting in columns:

    // eslint-disable-next-line no-console
    console.log({ deviceQueryString });
  }
}
