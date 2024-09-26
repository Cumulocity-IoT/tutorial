import { Inject, Injectable, Optional } from '@angular/core';
import {
  AbstractConfigurationStrategy,
  DATA_GRID_CONFIGURATION_CONTEXT,
  DATA_GRID_CONFIGURATION_CONTEXT_PROVIDER,
  GridConfig,
  GridConfigContext,
  GridConfigContextProvider
} from '@c8y/ngx-components';
import { Observable, of } from 'rxjs';

/**
 * A <code>DataGridConfigurationStrategy</code> gives you the flexibility to implement
 * the desired mechanism of how data grid configuration (column order, visibility, sorting,
 * filtering, custom columns, pagination) can be persisted.
 */
@Injectable()
export class VoidConfigurationStrategy extends AbstractConfigurationStrategy {
  constructor(
    @Inject(DATA_GRID_CONFIGURATION_CONTEXT)
    @Optional()
    protected context: GridConfigContext,
    @Inject(DATA_GRID_CONFIGURATION_CONTEXT_PROVIDER)
    @Optional()
    protected contextProvider: GridConfigContextProvider
  ) {
    super(context, contextProvider);
  }

  getConfig$(): Observable<GridConfig> {
    return of(null);
  }

  saveConfig$(): Observable<GridConfig> {
    return of(null);
  }
}
