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
@Injectable({ providedIn: 'root' })
export class DeviceGridExampleConfigurationStrategy extends AbstractConfigurationStrategy {
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

  getConfig$(ctx?: GridConfigContext): Observable<GridConfig> {
    const context = this.retrieveContext(ctx);
    return context?.key
      ? of(JSON.parse(localStorage.getItem(context?.key)) as unknown as GridConfig)
      : null;
  }

  saveConfig$(config: GridConfig, ctx?: GridConfigContext): Observable<GridConfig> {
    const context = this.retrieveContext(ctx);
    if (context?.key) {
      localStorage.setItem(context.key, JSON.stringify(config));
    }
    return of(config);
  }
}
