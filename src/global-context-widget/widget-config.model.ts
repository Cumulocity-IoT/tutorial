import {
  GlobalContextState,
  CONTEXT_FEATURE,
  PresetDefinition
} from '@c8y/ngx-components/global-context';

/**
 * Widget configuration interface for the Global Context example widget.
 *
 * Extends `GlobalContextState` to inherit all time context properties:
 * - `dateTimeContext`: Contains `dateFrom`, `dateTo`, and `interval`
 * - `refreshOption`: 'live' | 'history' - determines time mode
 * - `isAutoRefreshEnabled`: Whether auto-refresh is active
 * - `refreshInterval`: Auto-refresh interval in milliseconds
 * - `aggregation`: Data aggregation level (MINUTELY, HOURLY, DAILY)
 * - `displayMode`: 'dashboard' | 'config' | 'view_and_config'
 *
 * These properties are automatically managed by `GlobalContextSectionComponent`
 * when configured via `hookWidgetConfig`.
 */
export interface WidgetConfig extends GlobalContextState {
  /** Custom widget title displayed in the widget header */
  title?: string;
}

/**
 * Widget controls definition shared between widget registration (index.ts)
 * and the view component. Defines which time context features are available
 * in each display mode.
 *
 * Available features:
 * - CONTEXT_FEATURE.LIVE_TIME - Relative time window (e.g., "last 1 hour")
 * - CONTEXT_FEATURE.HISTORY_TIME - Fixed date range picker
 * - CONTEXT_FEATURE.AUTO_REFRESH - Auto-refresh toggle (5s interval)
 * - CONTEXT_FEATURE.AGGREGATION - Data aggregation selector
 * - CONTEXT_FEATURE.REFRESH - Manual refresh button
 */
export const WIDGET_CONTROLS: PresetDefinition = {
  dashboard: [
    CONTEXT_FEATURE.LIVE_TIME,
    CONTEXT_FEATURE.HISTORY_TIME,
    CONTEXT_FEATURE.AUTO_REFRESH,
    CONTEXT_FEATURE.AGGREGATION
  ],
  config: [
    CONTEXT_FEATURE.LIVE_TIME,
    CONTEXT_FEATURE.HISTORY_TIME,
    CONTEXT_FEATURE.AUTO_REFRESH,
    CONTEXT_FEATURE.AGGREGATION
  ],
  view_and_config: [
    CONTEXT_FEATURE.LIVE_TIME,
    CONTEXT_FEATURE.HISTORY_TIME,
    CONTEXT_FEATURE.AUTO_REFRESH,
    CONTEXT_FEATURE.AGGREGATION
  ]
};
