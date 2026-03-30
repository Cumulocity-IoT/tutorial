import { Component, Input, OnInit, inject, signal, computed } from '@angular/core';
import { DashboardChildComponent, DatePipe } from '@c8y/ngx-components';
import {
  LocalControlsComponent,
  GlobalContextConnectorComponent,
  GlobalContextState,
  DisplayMode,
  GLOBAL_CONTEXT_DISPLAY_MODE,
  REFRESH_OPTION
} from '@c8y/ngx-components/global-context';
import { WidgetConfig, WIDGET_CONTROLS } from './widget-config.model';

/**
 * Example widget view component demonstrating Global Time Context v2 integration.
 *
 * The `displayMode` determines **where time controls come from** (not visual appearance):
 *
 * **Dashboard mode** (`displayMode: 'dashboard'`):
 * - Time is controlled by the dashboard-level action bar (shared across all widgets)
 * - Uses `GlobalContextConnectorComponent` to connect the widget to the global time context
 * - All widgets on the dashboard share the same time range
 *
 * **Config mode** (`displayMode: 'config'`):
 * - Time is controlled only in the widget configuration panel
 * - Uses `LocalControlsComponent` with the widget's stored time range
 * - Widget operates with a fixed, pre-configured time range at runtime
 *
 * **View_and_config mode** (`displayMode: 'view_and_config'`):
 * - Time is controlled by inline controls rendered inside the widget itself
 * - Uses `LocalControlsComponent` for independent, user-adjustable time controls
 * - Widget has its own time range, not linked to other widgets
 *
 * Key integration points:
 * - `[controls]` - Defines which features are available (live time, history, aggregation, etc.)
 * - `[config]` - Current time context state (dateFrom, dateTo, aggregation, etc.)
 * - `[isLoading]` - When true, pauses auto-refresh counter until loading completes
 * - `(configChange)` - Emitted when user changes time context settings
 * - `(refresh)` - Emitted on auto-refresh tick or manual refresh
 *
 * @example
 * ```html
 * <!-- In dashboard mode, use GlobalContextConnector -->
 * <c8y-global-context-connector
 *   [controls]="widgetControls"
 *   [config]="contextConfig()"
 *   [isLoading]="isLoading()"
 *   [dashboardChild]="getDashboardChild()"
 *   (configChange)="onContextChange($event)"
 *   (refresh)="onRefresh()"
 * ></c8y-global-context-connector>
 * ```
 */
@Component({
  selector: 'c8y-global-context-widget-view',
  standalone: true,
  imports: [DatePipe, LocalControlsComponent, GlobalContextConnectorComponent],
  template: `
    <!-- Dashboard mode: Connect to global time context -->
    @if (displayMode() === GLOBAL_CONTEXT_DISPLAY_MODE.DASHBOARD) {
      <c8y-global-context-connector
        [controls]="widgetControls"
        [config]="contextConfig()"
        [isLoading]="isLoading()"
        [dashboardChild]="getDashboardChild()"
        [linked]="isLinkedToGlobal()"
        (configChange)="onContextChange($event)"
        (refresh)="onRefresh()"
      ></c8y-global-context-connector>
    } @else {
      <!-- Config/View_and_config modes: Local controls -->
      <c8y-local-controls
        [controls]="widgetControls"
        [displayMode]="displayMode()"
        [config]="contextConfig()"
        [isLoading]="isLoading()"
        (configChange)="onContextChange($event)"
        (refresh)="onRefresh()"
      ></c8y-local-controls>
    }

    <!-- Widget content -->
    <div class="p-16">
      <!-- Status indicator -->
      <div class="m-b-16">
        <span class="text-muted small">Mode</span>
        <p class="m-b-0">
          <strong>{{ isLiveMode() ? 'Live' : 'History' }}</strong>
        </p>
      </div>

      <!-- Time Range -->
      @if (contextConfig().dateTimeContext; as dtc) {
        <div class="row m-b-16">
          <div class="col-xs-6">
            <p class="text-muted small m-b-4">From</p>
            <p class="text-medium m-b-0">{{ dtc.dateFrom | date: 'medium' }}</p>
          </div>
          <div class="col-xs-6">
            <p class="text-muted small m-b-4">To</p>
            <p class="text-medium m-b-0">{{ dtc.dateTo | date: 'medium' }}</p>
          </div>
        </div>

        <!-- Settings row -->
        <div class="d-flex flex-wrap p-t-8 p-b-8 separator-top">
          <div class="m-r-24">
            <span class="text-muted small">Duration</span>
            <p class="m-b-0">
              <strong>{{ formatDuration() }}</strong>
            </p>
          </div>
          <div class="m-r-24">
            <span class="text-muted small">Interval</span>
            <p class="m-b-0">
              <code>{{ dtc.interval || 'custom' }}</code>
            </p>
          </div>
          @if (contextConfig().aggregation) {
            <div>
              <span class="text-muted small">Aggregation</span>
              <p class="m-b-0">
                <code>{{ contextConfig().aggregation }}</code>
              </p>
            </div>
          }
        </div>
      } @else {
        <p class="text-muted">Waiting for time context...</p>
      }

      <!-- Data fetch status -->
      <div class="d-flex a-i-center p-t-8 separator-top">
        @if (isLoading()) {
          <i class="fa fa-spinner fa-spin m-r-8"></i>
          <span>Loading...</span>
        } @else {
          <span class="text-muted small m-r-16"
            >Last fetch: {{ lastFetchTime | date: 'mediumTime' }}</span
          >
          <span class="text-muted small">Fetches: {{ fetchCount }}</span>
        }
      </div>
    </div>
  `
})
export class GlobalContextWidgetViewComponent implements OnInit {
  /** Reference to DashboardChildComponent, required for GlobalContextConnector */
  private dashboardChild = inject(DashboardChildComponent);

  /** Widget configuration passed from the dashboard */
  @Input() config: WidgetConfig;

  /**
   * Determines where the time controls come from:
   * - 'dashboard': time controlled by the dashboard action bar (shared across widgets)
   * - 'config': time controlled only in the widget configuration panel (fixed at runtime)
   * - 'view_and_config': time controlled by inline controls inside the widget
   */
  displayMode = signal<DisplayMode>(GLOBAL_CONTEXT_DISPLAY_MODE.DASHBOARD);

  /** Current time context state (dateTimeContext, aggregation, refreshOption, etc.) */
  contextConfig = signal<GlobalContextState>({});

  /**
   * Controls link state to global context:
   * - `true` or `undefined`: Widget follows global time context (receives all changes)
   * - `false`: Widget uses local state, ignores global context changes
   *
   * Set to `false` when user is actively interacting with the widget
   * (scrolling, zooming, selecting) to prevent global changes from
   * interrupting their action. Set back to `true` when interaction ends.
   */
  isLinkedToGlobal = signal<boolean | undefined>(undefined);

  /**
   * Loading state signal. Pass this to the connector/controls.
   * When `true`, the auto-refresh counter pauses until loading completes.
   * This prevents data fetches from stacking up during slow API calls.
   */
  isLoading = signal<boolean>(false);

  /** Widget controls - shared with index.ts to keep registration and runtime in sync. */
  readonly widgetControls = WIDGET_CONTROLS;

  /** Expose display mode constants for use in template */
  readonly GLOBAL_CONTEXT_DISPLAY_MODE = GLOBAL_CONTEXT_DISPLAY_MODE;

  // ─────────────────────────────────────────────────────────────────────────────
  // DEMO-ONLY PROPERTIES - You can ignore these, they're just for visualization
  // ─────────────────────────────────────────────────────────────────────────────

  /** @ignore Demo only: Timestamp of last data fetch */
  lastFetchTime: Date | null = null;

  /** @ignore Demo only: Count of data fetches */
  fetchCount = 0;

  /** @ignore Demo only: Computed flag for Live mode display */
  isLiveMode = computed(() => this.contextConfig().refreshOption === REFRESH_OPTION.LIVE);

  /** @ignore Demo only: Computed flag for auto-refresh display */
  isAutoRefreshActive = computed(() => this.contextConfig().isAutoRefreshEnabled === true);

  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Initialize the widget with configuration from the dashboard.
   * In dashboard mode, waits for GlobalContextConnector to emit first state.
   * In other modes, fetches data immediately.
   */
  ngOnInit(): void {
    const {
      displayMode = GLOBAL_CONTEXT_DISPLAY_MODE.DASHBOARD,
      dateTimeContext,
      aggregation,
      isAutoRefreshEnabled,
      refreshInterval,
      refreshOption
    } = this.config;

    this.displayMode.set(displayMode as DisplayMode);
    this.contextConfig.set({
      dateTimeContext,
      aggregation,
      isAutoRefreshEnabled,
      refreshInterval,
      refreshOption
    });

    // In dashboard mode, GlobalContextConnector will emit the initial state
    // In other modes, we need to fetch data ourselves
    if (displayMode !== GLOBAL_CONTEXT_DISPLAY_MODE.DASHBOARD) {
      this.fetchData();
    }
  }

  /**
   * Handle context changes from GlobalContextConnector or LocalControls.
   * Called when user changes time range, aggregation, or other settings.
   *
   * @param event - Contains full context state and diff of what changed
   */
  onContextChange(event: { context: GlobalContextState; diff: GlobalContextState }): void {
    const { diff, context } = event;

    // Always update context config for UI reactivity
    this.contextConfig.set(event.context);

    // Optimization: Skip fetch if only auto-refresh was disabled in Live mode.
    // In Live mode, the time window slides automatically, so we don't need to
    // re-fetch just because auto-refresh was turned off.
    if (
      diff.isAutoRefreshEnabled === false &&
      Object.keys(diff).length === 1 &&
      context.refreshOption === REFRESH_OPTION.LIVE
    ) {
      return;
    }

    this.fetchData();
  }

  /**
   * Handle refresh events (manual refresh button or auto-refresh tick).
   */
  onRefresh(): void {
    this.fetchData();
  }

  /**
   * Required for GlobalContextConnector - provides reference to DashboardChildComponent.
   * This allows the connector to register the widget with the dashboard's context system.
   */
  getDashboardChild(): DashboardChildComponent {
    return this.dashboardChild;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // DEMO-ONLY METHOD - You can ignore this, it's just for visualization
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * @ignore Demo only: Format the time range duration for display (e.g., "1h 30m", "2d 4h").
   * This is not part of the Global Context integration - just a helper for this demo widget.
   */
  formatDuration(): string {
    const dtc = this.contextConfig().dateTimeContext;
    if (!dtc?.dateFrom || !dtc?.dateTo) {
      return '-';
    }

    const diffMs = new Date(dtc.dateTo).getTime() - new Date(dtc.dateFrom).getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Fetch data based on current time context.
   * Demonstrates proper loading state management:
   * 1. Set isLoading to true (pauses auto-refresh counter)
   * 2. Perform API call using contextConfig().dateTimeContext for time range
   * 3. Set isLoading to false (resumes auto-refresh counter)
   */
  private async fetchData(): Promise<void> {
    try {
      this.isLoading.set(true);

      // In a real widget, you would use the time context for API calls:
      // const { dateFrom, dateTo } = this.contextConfig().dateTimeContext;
      // const data = await this.api.getData({ dateFrom, dateTo });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      this.lastFetchTime = new Date();
      this.fetchCount++;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
