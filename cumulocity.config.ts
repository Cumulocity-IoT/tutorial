import { ConfigurationOptions } from '@c8y/devkit';
import { DefinePlugin } from 'webpack';
import { author, description, name, version, license } from './package.json';

export default {
  runTime: {
    author,
    description,
    version,
    name,
    globalTitle: 'Tutorial application IoT',
    tabsHorizontal: true,
    rightDrawer: true,
    contextHelp: true,
    icon: {
      class: 'c8y-icon-tools'
    },
    license,
    docs: {
      links: [
        {
          label: 'Legacy link',
          icon: 'c8y-icon c8y-icon-tools',
          url: 'https://legacy-link.com',
          type: 'doc'
        },
        {
          label: 'Doc link from package.json',
          icon: 'c8y-icon c8y-icon-c8y',
          url: 'https://new-doc-link.com',
          type: 'doc'
        },
        {
          label: 'Quick link from package.json',
          icon: 'c8y-icon c8y-icon-atom',
          url: 'https://cumulocity.com/guides/web/angular/',
          type: 'quicklink'
        }
      ]
    },
    languages: {
      it: {
        name: 'Italian',
        nativeName: 'Italian'
      }
    },
    exports: [
      {
        name: 'Resizable grid example',
        module: 'ResizableGridExampleModule',
        path: './src/resizable-grid-example/resizable-grid-example.module.ts',
        description: 'An example for a grid with two resizable columns.',
        scope: 'self'
      },
      {
        name: 'Introduction to asset selector',
        module: 'AssetSelectorExampleModule',
        path: './src/selector/asset-selector-example/general-example/asset-selector-example.module.ts',
        description: 'An introduction to asset selector',
        scope: 'self'
      },
      {
        name: 'Introduction Example Module',
        module: 'IntroductionExampleModule',
        path: './src/dynamic-forms/introduction-example/introduction-example.module.ts',
        description: 'An introduction to dynamic forms.',
        scope: 'self'
      },
      {
        name: 'Introduction Example Module',
        module: 'NamedContextDashboardModule',
        path: './src/dashboard/named-context-dashboard/named-context-dashboard.module.ts',
        description: 'An introduction to named context dashboards forms.',
        scope: 'self'
      },
      {
        name: 'Miller options',
        module: 'AssetSelectorMillerExampleModule',
        path: './src/selector/asset-selector-example/miller-columns-options/asset-selector-miller-example.module.ts',
        description: 'Options for the miller columns',
        scope: 'self'
      },
      {
        name: 'Tree options',
        module: 'AssetSelectorTreeExampleModule',
        path: './src/selector/asset-selector-example/tree-options/asset-selector-tree-example.module.ts',
        description: 'Options for the hierarchy tree',
        scope: 'self'
      },
      {
        name: 'Introduction to asset selector different root',
        module: 'AssetSelectorDifferentRootModule',
        path: './src/selector/asset-selector-example/different-root/asset-selector-different-root.module.ts',
        description: 'An introduction to asset selector different root example.',
        scope: 'self'
      },
      {
        name: 'Introduction to service dashboard module',
        module: 'ServiceDashboardModule',
        path: './src/dashboard/service-dashboard/service-dashboard.module.ts',
        description: 'An introduction to dynamic forms.',
        scope: 'self'
      },
      {
        name: 'Introduction cotext dashboard module',
        module: 'ContextDashboardModule',
        path: './src/dashboard/context-dashboard/context-dashboard.module.ts',
        description: 'An introduction to dynamic forms.',
        scope: 'self'
      },
      {
        name: 'Introduction custom dashboard module',
        module: 'CustomDashboardModule',
        path: './src/dashboard/custom-dashboard/custom-dashboard.module.ts',
        description: 'An introduction to custom dashboards.',
        scope: 'self'
      },
      {
        name: 'Dashboard module with example of dynamic component usage',
        module: 'WidgetGuideDashboardModule',
        path: './src/dashboard/widget-guide-dashboard/widget-guide-dashboard.module.ts',
        description: 'An example showing usage of custom widget in dashboard.',
        scope: 'self'
      },
      {
        name: 'Context dashboard module with example of dynamic component usage',
        module: 'WidgetGuideContextDashboardModule',
        path: './src/dashboard/widget-guide-context-dashboard/widget-guide-context-dashboard.module.ts',
        description: 'An example showing usage of custom widget in context dashboard.',
        scope: 'self'
      },
      {
        name: 'Introduction datapoint selection module',
        module: 'DatapointSelectionExampleModule',
        path: './src/selector/datapoint-selection-example/general-example/datapoint-selection-example.module.ts',
        description: 'An introduction to dynamic forms.',
        scope: 'self'
      },
      {
        name: 'Introduction widget dashboard module',
        module: 'WidgetDashboardModule',
        path: './src/dashboard/widget-dashboard/widget-dashboard.module.ts',
        description: 'An introduction to dynamic forms.',
        scope: 'self'
      },
      {
        name: 'JSON Schema Example Module',
        module: 'JsonSchemaExampleModule',
        path: './src/dynamic-forms/json-schema-example/json-schema-example.module.ts',
        description: 'A JSON Schema sample for dynamic forms.',
        scope: 'self'
      },
      {
        name: 'Custom Elements Example Module',
        module: 'CustomElementExampleModule',
        path: './src/dynamic-forms/custom-element-example/custom-element-example.module.ts',
        description: 'A sample for a custom element in dynamic forms.',
        scope: 'self'
      },
      {
        name: 'Validation Example Module',
        module: 'ValidationExampleModule',
        path: './src/dynamic-forms/validation-example/validation-example.module.ts',
        description: 'A sample for validation options in dynamic forms.',
        scope: 'self'
      },
      {
        name: 'Forms validation example module',
        module: 'FormsTutorialModule',
        path: './src/forms/form-validation/forms.module.ts',
        description: 'A sample for forms validation example.',
        scope: 'self'
      },
      {
        name: 'CSS Component styles Example',
        module: 'CascadingStyleSheetsExampleModule',
        path: './src/component-styles/cascading-style-sheets-example/cascading-style-sheets-example.module.ts',
        description: 'A sample for component styles using CSS.',
        scope: 'self'
      },
      {
        name: 'LESS Component styles Example',
        module: 'LeanerStyleSheetsExampleModule',
        path: './src/component-styles/leaner-style-sheets-example/leaner-style-sheets-example.module.ts',
        description: 'A sample for component styles using LESS.',
        scope: 'self'
      },
      {
        name: 'SCSS Component styles Example',
        module: 'SyntacticallyAwesomeStyleSheetsExampleModule',
        path: './src/component-styles/syntactically-awesome-style-sheets-example/syntactically-awesome-style-sheets-example.module.ts',
        description: 'A sample for component styles using SCSS.',
        scope: 'self'
      },
      {
        name: 'Simple map',
        module: 'SimpleMapExampleModule',
        path: './src/maps/simple-map/simple-map-example.module.ts',
        description: 'A sample for simple map.',
        scope: 'self'
      },
      {
        name: 'Simple map with custom config',
        module: 'SimpleMapCustomConfigModule',
        path: './src/maps/simple-map-custom-config/simple-map-custom-config.module.ts',
        description: 'A sample for simple map with custom config.',
        scope: 'self'
      },
      {
        name: 'Cluster map',
        module: 'ClusterMapExampleModule',
        path: './src/maps/cluster-map/cluster-map-example.module.ts',
        description: 'A sample for cluster map.',
        scope: 'self'
      },
      {
        name: 'Action',
        module: 'ActionModule',
        path: './src/hooks/action/action.module.ts',
        description: 'A sample for action hook.',
        scope: 'self'
      },
      {
        name: 'Action bar',
        module: 'ActionBarModule',
        path: './src/hooks/action-bar/action-bar.module.ts',
        description: 'A sample for action bar hook.',
        scope: 'self'
      },
      {
        name: 'Default Preview feature',
        module: 'PreviewFeatureDefaultModule',
        path: './src/hooks/preview-feature/basic-view-default/preview-feature-default.module.ts',
        description: 'A sample for default feature preview hook.',
        scope: 'self'
      },
      {
        name: 'Custom Preview feature',
        module: 'PreviewFeatureCustomModule',
        path: './src/hooks/preview-feature/basic-view-custom/preview-feature-custom.module.ts',
        description: 'A sample for custom feature preview hook.',
        scope: 'self'
      },
      {
        name: 'Breadcrumbs hook',
        module: 'BreadcrumbsModule',
        path: './src/hooks/breadcrumbs/breadcrumbs.module.ts',
        description: 'A sample for breadcrumbs hook.',
        scope: 'self'
      },
      {
        name: 'Breadcrumbs expand',
        module: 'BreadcrumbsExpandExampleModule',
        path: './src/breadcrumbs/expand-example/breadcrumbs-expand-example.module.ts',
        description: 'A sample for breadcrumbs.',
        scope: 'self'
      },
      {
        name: 'Breadcrumbs outlet',
        module: 'BreadcrumbsOutletExampleModule',
        path: './src/breadcrumbs/outlet/breadcrumbs-outlet-example.module.ts',
        description: 'A sample for breadcrumb outlet.',
        scope: 'self'
      },
      {
        name: 'Breadcrumbs basic',
        module: 'BreadcrumbsExampleModule',
        path: './src/breadcrumbs/basic-example/breadcrumbs-example.module.ts',
        description: 'A sample for breadcrumbs.',
        scope: 'self'
      },
      {
        name: 'Breadcrumbs content projection',
        module: 'BreadcrumbsContentProjectionExampleModule',
        path: './src/breadcrumbs/content-projection/breadcrumbs-content-projection-example.module.ts',
        description: 'A sample for breadcrumbs content projection.',
        scope: 'self'
      },
      {
        name: 'Resizable example',
        module: 'SplitViewResizableExampleModule',
        path: './src/split-view/resizable-example/split-view-resizable-example.module.ts',
        description: 'A sample for split view with resizable layout.',
        scope: 'self'
      },
      {
        name: 'Fixed example',
        module: 'SplitViewFixedExampleModule',
        path: './src/split-view/fixed-example/split-view-fixed-example.module.ts',
        description: 'A sample for split view with fixed layout.',
        scope: 'self'
      },
      {
        name: 'Split view full width',
        module: 'SplitViewFullWidthExampleModule',
        path: './src/split-view/full-width-example/split-view-full-width-example.module.ts',
        description: 'A sample for split view in full width mode.',
        scope: 'self'
      },
      {
        name: 'Component',
        module: 'ComponentModule',
        path: './src/hooks/component/component.module.ts',
        description: 'A sample for component hook.',
        scope: 'self'
      },
      {
        name: 'Wizard',
        module: 'WizardModule',
        path: './src/hooks/generic-wizard/wizard.module.ts',
        description: 'A sample for wizard hook.',
        scope: 'self'
      },
      {
        name: 'Service hook Codex sample',
        module: 'ServiceHookCodexSampleModule',
        path: './src/hooks/service/service-hook-codex-sample.module.ts',
        description: 'A sample for hookService.',
        scope: 'self'
      },
      {
        name: 'Stepper',
        module: 'StepperHookModule',
        path: './src/hooks/stepper/stepper-hook.module.ts',
        description: 'A sample for stepper hook.',
        scope: 'self'
      },
      {
        name: 'Tabs',
        module: 'TabsModule',
        path: './src/hooks/tabs/tabs.module.ts',
        description: 'A sample for tabs hook.',
        scope: 'self'
      },
      {
        name: 'Named router outlet',
        module: 'NamedOutletModule',
        path: './src/hooks/tabs/named-outlet/named-outlet.module.ts',
        description: 'A sample for named router outlet and related hooks.',
        scope: 'self'
      },
      {
        name: 'Navigator-route',
        module: 'NavigatorRouteModule',
        path: './src/hooks/navigator-route/navigator-route.module.ts',
        description: 'A sample for navigator and route hooks.',
        scope: 'self'
      },
      {
        name: 'Map popup',
        module: 'MapPopupExampleModule',
        path: './src/maps/map-popup/map-popup-example.module.ts',
        description: 'A popup example for the map component.',
        scope: 'self'
      },
      {
        name: 'Cluster map root node',
        module: 'ClusterMapRootNodeExampleModule',
        path: './src/maps/cluster-map-root-node/cluster-map-root-node-example.module.ts',
        description: 'A cluster map with a different root node.',
        scope: 'self'
      },
      {
        name: 'List basic with checkboxes',
        module: 'ListCheckModule',
        path: './src/list/list/list-check/list-check.module.ts',
        description: 'A sample for basic list with checkboxes.',
        scope: 'self'
      },
      {
        name: 'List basic with timeline',
        module: 'ListTimelineModule',
        path: './src/list/list/list-timeline/list-timeline.module.ts',
        description: 'A sample for basic list with timeline.',
        scope: 'self'
      },
      {
        name: 'List virtal scroll with checkboxes',
        module: 'ListVirtualScrollCheckModule',
        path: './src/list/list-virtual-scroll/list-virtual-scroll-check/list-virtual-scroll-check.module.ts',
        description: 'A sample for list with virtual scroll witch checkboxes.',
        scope: 'self'
      },
      {
        name: 'List virtal scroll with timeline',
        module: 'ListVirtualScrollTimelineModule',
        path: './src/list/list-virtual-scroll/list-virtual-scroll-timeline/list-virtual-scroll-timeline.module.ts',
        description: 'A sample for list with virtual scroll with timeline.',
        scope: 'self'
      },
      {
        name: 'Text translation NgNonBindable',
        module: 'TextTranslationNgnonbindableModule',
        path: './src/translations/text-translation/ngNonBindable-translation/text-translation-ngnonbindable.module.ts',
        description: 'A sample for text nonBindable translation module.',
        scope: 'self'
      },
      {
        name: 'Text translation by service',
        module: 'TextTranslationByServiceModule',
        path: './src/translations/text-translation/service-translation/text-translation-by-service.module.ts',
        description: 'A sample for text translation module by service.',
        scope: 'self'
      },
      {
        name: 'Text translation by gettext',
        module: 'TextTranslationGettextModule',
        path: './src/translations/text-translation/gettext-translation/text-translation-gettext.module.ts',
        description: 'A sample for text translation module by gettext.',
        scope: 'self'
      },
      {
        name: 'Date translation by c8y pipe',
        module: 'C8yDateTranslationModule',
        path: './src/translations/date-translation/c8y-translation/c8y-date-translation.module.ts',
        description: 'A sample for text translation module by c8y pipe.',
        scope: 'self'
      },
      {
        name: 'Date translation by Angular pipe',
        module: 'DateTranslationModule',
        path: './src/translations/date-translation/ng-translation/date-translation.module.ts',
        description: 'A sample for date translation module by Angular pipe.',
        scope: 'self'
      },
      {
        name: 'Dynamic form translation',
        module: 'DynamicFormTranslationModule',
        path: './src/translations/dynamic-form-translation/dynamic-form-translation.module.ts',
        description: 'A sample for Dynamic form translation.',
        scope: 'self'
      },
      {
        name: 'New language',
        module: 'NewLanguageModule',
        path: './src/translations/new-language/new-language.module.ts',
        description: 'A sample for new language module.',
        scope: 'self'
      },
      {
        name: 'Dynamic form translation',
        module: 'NewTranslationModule',
        path: './src/translations/new-translate/new-translation.module.ts',
        description: 'A sample for new translation module.',
        scope: 'self'
      },
      {
        name: 'Alert example',
        module: 'AlertExampleModule',
        path: './src/alert/alert-example.module.ts',
        description: 'A sample for alerts.',
        scope: 'self'
      },
      {
        name: 'App icon example',
        module: 'AppIconExampleModule',
        path: './src/app-icon/app-icon-example.module.ts',
        description: 'An example for App Icon component.',
        scope: 'self'
      },
      {
        name: 'Client grid example',
        module: 'ClientGridExampleModule',
        path: './src/grids/client-grid-example/client-grid-example.module.ts',
        description: 'An example for a client data grid.',
        scope: 'self'
      },
      {
        name: 'Server grid example',
        module: 'ServerGridExampleModule',
        path: './src/grids/server-grid-example/server-grid-example.module.ts',
        description: 'An example for a server data grid.',
        scope: 'self'
      },
      {
        name: 'Tree grid example',
        module: 'TreeGridExampleModule',
        path: './src/grids/tree-grid-example/tree-grid-example.module.ts',
        description: 'An example for a tree data grid.',
        scope: 'self'
      },
      {
        name: 'Device grid example',
        module: 'DeviceGridExampleModule',
        path: './src/grids/device-grid-example/device-grid-example.module.ts',
        description: 'An example for a device data grid.',
        scope: 'self'
      },
      {
        name: 'Empty grid example',
        module: 'EmptyGridExampleModule',
        path: './src/grids/empty-grid-example/empty-grid-example.module.ts',
        description: 'An example for an empty data grid.',
        scope: 'self'
      },
      {
        name: 'Sync expandable rows example',
        module: 'SyncExpandableRowsGridExampleModule',
        path: './src/grids/sync-expandable-rows-grid-example/sync-expandable-rows-grid-example.module.ts',
        description: 'An example for synchronous expandable rows.',
        scope: 'self'
      },
      {
        name: 'Async expandable rows example',
        module: 'AsyncExpandableRowsGridExampleModule',
        path: './src/grids/async-expandable-rows-grid-example/async-expandable-rows-grid-example.module.ts',
        description: 'An example for asynchronous expandable rows.',
        scope: 'self'
      },
      {
        name: 'Right drawer hook sample',
        module: 'RightDrawerModule',
        path: './src/hooks/drawer/right-drawer-tutorial/right-drawer.module.ts',
        description: 'An example for hooking into the right drawer.',
        scope: 'self'
      },
      {
        name: 'Left drawer hook sample',
        module: 'LeftDrawerModule',
        path: './src/hooks/drawer/left-drawer-tutorial/left-drawer.module.ts',
        description: 'An example for hooking into the left drawer.',
        scope: 'self'
      },
      {
        name: 'User menu hook sample',
        module: 'TutorialUserMenuModule',
        path: './src/hooks/user-menu-item/user-menu.module.ts',
        description: 'An example for hooking into the user menu items.',
        scope: 'self'
      },
      {
        name: 'Version hook sample',
        module: 'TutorialVersionModule',
        path: './src/hooks/version/version.module.ts',
        description: 'An example for hooking into the shown versions.',
        scope: 'self'
      },
      {
        name: 'Query param bottom drawer hook sample',
        module: 'QueryParamBottomDrawerModule',
        path: './src/hooks/query-param-bottom-drawer/query-param-bottom-drawer.module.ts',
        description: 'An example for hooking into the query param bottom drawer.',
        scope: 'self'
      },
      {
        name: 'Query param modal hook sample',
        module: 'QueryParamModalModule',
        path: './src/hooks/query-param-modal/query-param-modal.module.ts',
        description: 'An example for hooking into the query param modal.',
        scope: 'self'
      },
      {
        name: 'pop confirm example',
        module: 'PopConfirmExampleModule',
        path: './src/popconfirm/pop-confirm-example.module.ts',
        description: 'An example for pop confirm.',
        scope: 'self'
      },
      {
        name: 'Quick link example',
        module: 'QuickLinkExampleModule',
        path: './src/quick-link/quick-link-example.module.ts',
        description: 'An example of using quick links.',
        scope: 'self'
      },
      {
        name: 'Properties list example',
        module: 'PropertiesListExampleModule',
        path: './src/properties-list/properties-list-example.module.ts',
        description: 'An example of using properties list.',
        scope: 'self'
      },
      {
        name: 'Confirm modal example',
        module: 'ConfirmModalExampleModule',
        path: './src/modal/confirm-modal/confirm-modal-example.module.ts',
        description: 'An example for using confirm Modal.',
        scope: 'self'
      },
      {
        name: 'For of directive example',
        module: 'ForOfModule',
        path: './src/for-of-directive/for-of.module.ts',
        description: 'An example for For of directive.',
        scope: 'self'
      },
      {
        name: 'Generate JSON Schema example',
        module: 'GenerateJsonSchemaModule',
        path: './src/generate-json-schema/generate-json-schema.module.ts',
        description: 'An example for generate JSON schema from interface.',
        scope: 'self'
      },
      {
        name: 'Example of ngx modal',
        module: 'NgxModalExampleModule',
        path: './src/modal/ngx-modal/ngx-modal-example.module.ts',
        description: 'An example for ngx modal.',
        scope: 'self'
      },
      {
        name: 'Example of ngx modal sizes',
        module: 'NgxModalSizesExampleModule',
        path: './src/modal/ngx-modal-sizes/ngx-modal-sizes-example.module.ts',
        description: 'An example for ngx modal of different sizes.',
        scope: 'self'
      },
      {
        name: 'Example of ngx modal selectors',
        module: 'NgxModalSelectorsExampleModule',
        path: './src/modal/ngx-modal-selectors/ngx-modal-selectors-example.module.ts',
        description: 'An example for ngx modal using ng-content selectors.',
        scope: 'self'
      },
      {
        name: 'Example of ngx modal accessibility',
        module: 'NgxModalAccessibilityExampleModule',
        path: './src/modal/ngx-modal-accessibility/ngx-modal-accessibility-example.module.ts',
        description: 'An example for ngx modal accessibility.',
        scope: 'self'
      },
      {
        name: 'Example of realtime',
        module: 'RealtimeTutorialModule',
        path: './src/realtime/realtime-tutorial.module.ts',
        description: 'An example for realtime.',
        scope: 'self'
      },
      {
        name: 'Example of provider configuration',
        module: 'ProviderConfigurationTutorialModule',
        path: './src/provider-configuration/provider-configuration-example/provider-configuration.module.ts',
        description: 'An example for provider configuration.',
        scope: 'self'
      },
      {
        name: 'Example of help',
        module: 'HelpExampleModule',
        path: './src/help/help-example.module.ts',
        description: 'An example for help.',
        scope: 'self'
      },
      {
        name: 'Example of extendable input list',
        module: 'ExtendableInputListExampleModule',
        path: './src/input-group/extendable-input-list-example.module.ts',
        description: 'An example for extendable input list.',
        scope: 'self'
      },
      {
        name: 'Example of time picker',
        module: 'TimePickerExampleModule',
        path: './src/time/time-picker-example.module.ts',
        description: 'An example for time picker.',
        scope: 'self'
      },
      {
        name: 'Example of date time range picker',
        module: 'DateTimeRangeExampleModule',
        path: './src/date-time-range/date-time-range-example.module.ts',
        description: 'An example for date time range picker.',
        scope: 'self'
      },
      {
        name: 'Example of range input',
        module: 'RangeInputExampleModule',
        path: './src/input/range-input-example.module.ts',
        description: 'An example for range input.',
        scope: 'self'
      },
      {
        name: 'Introduction to datapoint selection list example',
        module: 'DatapointSelectionListExampleModule',
        path: './src/selector/datapoint-selection-example/list-example/datapoint-selection-list-example.module.ts',
        description: 'An introduction to datapoint selection list example.',
        scope: 'self'
      },
      {
        name: 'Introduction to datapoint validation example',
        module: 'DatapointSelectionModalExampleModule',
        path: './src/selector/datapoint-selection-example/modal-example/datapoint-selection-modal-example.module.ts',
        description: 'An introduction to datapoint modal example.',
        scope: 'self'
      },
      {
        name: 'Introduction to datapoint validation example',
        module: 'DatapointSelectionValidationExampleModule',
        path: './src/selector/datapoint-selection-example/validation-example/datapoint-selection-validation-example.module.ts',
        description: 'An introduction to datapoint validation example.',
        scope: 'self'
      },
      {
        name: 'Introduction to datapoint drag and drop example',
        module: 'DatapointSelectionDragdropExampleModule',
        path: './src/selector/datapoint-selection-example/dragdrop-example/datapoint-selection-dragdrop-example.module.ts',
        description: 'An introduction to datapoint drag and drop example.',
        scope: 'self'
      },
      {
        name: 'Introduction to datapoint selector example',
        module: 'DatapointSelectionSelectorExampleModule',
        path: './src/selector/datapoint-selection-example/selector/datapoint-selection-selector-example.module.ts',
        description: 'An introduction to datapoint selector example.',
        scope: 'self'
      },
      {
        name: 'Introduction to datapoint context example',
        module: 'DatapointSelectionContextExampleModule',
        path: './src/selector/datapoint-selection-example/context-example/datapoint-selection-context-example.module.ts',
        description: 'An introduction to datapoint context example.',
        scope: 'self'
      },
      {
        name: 'Introduction to datapoint without templates',
        module: 'DatapointSelectionNotemplatesExampleModule',
        path: './src/selector/datapoint-selection-example/no-templates-example/datapoint-selection-notemplates-example.module.ts',
        description: 'An introduction to datapoint without templates example.',
        scope: 'self'
      },
      {
        name: 'Introduction to alarm event selector',
        module: 'AlarmEventSlectorExampleModule',
        path: './src/selector/alarm-event-selector-example/alarm-event-selector.module.ts',
        description: 'An introduction to alarm event selector example.',
        scope: 'self'
      },
      {
        name: 'Introduction to data points export selector',
        module: 'DatapointsExportSelectorExampleModule',
        path: './src/selector/data-points-export-selector-example/datapoints-export-selector.module.ts',
        description: 'An introduction to data points export selector example.',
        scope: 'self'
      },
      {
        name: 'Introduction to properties selector- inline usage',
        module: 'propertiesSelectorInlineExampleProviders',
        path: './src/selector/properties-selector-inline-example/properties-selector-inline.providers.ts',
        description: 'An introduction to properties selector example- inline usage.',
        scope: 'self'
      },
      {
        name: 'Introduction to properties selector- drawer usage',
        module: 'propertiesSelectorDrawerExampleProviders',
        path: './src/selector/properties-selector-drawer-example/properties-selector-drawer.providers.ts',
        description: 'An introduction to properties selector example- drawer usage.',
        scope: 'self'
      },
      {
        name: 'Properties selector- computed properties',
        module: 'computedAssetPropertiesProvidersExample',
        path: './src/selector/properties-selector-computed-properties/index.ts',
        description: 'Hookable computed property example.',
        scope: 'self'
      },
      {
        name: 'Introduction to asset selector device child',
        module: 'AssetSingleSelectModule',
        path: './src/selector/asset-selector-example/single-select/asset-single-select.module.ts',
        description: 'An introduction to asset selector device child example.',
        scope: 'self'
      },
      {
        name: 'Introduction to asset selector single select',
        module: 'AssetSelectorChildDevicesModule',
        path: './src/selector/asset-selector-example/child-devices/asset-selector-child-devices.module.ts',
        description: 'An introduction to asset selector single select example.',
        scope: 'self'
      },
      {
        name: 'Introduction to asset selector only devices',
        module: 'AssetSelectorOnlyDevicesModule',
        path: './src/selector/asset-selector-example/only-devices/asset-selector-only-devices.module.ts',
        description: 'An introduction to asset selector only devices example.',
        scope: 'self'
      },
      {
        name: 'Introduction to asset selector column header',
        module: 'AssetSelectorColumnHeaderModule',
        path: './src/selector/asset-selector-example/column-header/asset-selector-column-header.module.ts',
        description: 'An introduction to asset selector column header and filter example.',
        scope: 'self'
      },
      {
        name: 'Introduction to asset selector global search',
        module: 'AssetSelectorGlobalSearchModule',
        path: './src/selector/asset-selector-example/global-search/asset-selector-global-search.module.ts',
        description: 'An introduction to asset selector global search example.',
        scope: 'self'
      },
      {
        name: 'Introduction to asset selector multi select',
        module: 'AssetSelectorMultiSelectModule',
        path: './src/selector/asset-selector-example/multi-select/asset-selector-multi-select.module.ts',
        description: 'An introduction to asset selector multi select example.',
        scope: 'self'
      },
      {
        name: 'Introduction to asset selector single search',
        module: 'AssetSelectorSingleSearchModule',
        path: './src/selector/asset-selector-example/single-search/asset-selector-single-search.module.ts',
        description: 'An introduction to asset selector single search example.',
        scope: 'self'
      },
      {
        name: 'Introduction to asset selector tree single',
        module: 'AssetSelectorTreeSingleModule',
        path: './src/selector/asset-selector-example/tree-single/asset-selector-tree-single.module.ts',
        description: 'An introduction to asset selector tree single example.',
        scope: 'self'
      },
      {
        name: 'Introduction to asset selector tree devices',
        module: 'AssetSelectorTreeDevicesModule',
        path: './src/selector/asset-selector-example/tree-devices/asset-selector-tree-devices.module.ts',
        description: 'An introduction to asset selector tree devices example.',
        scope: 'self'
      },
      {
        name: 'Example of selectable nodes in the asset selector',
        module: 'AssetSelectorNodeSelectableExampleModule',
        path: './src/selector/asset-selector-example/node-selectable/asset-selector-node-selectable.module.ts',
        description: 'Selectable nodes example for the asset-selector',
        scope: 'self'
      },
      {
        name: 'Introduction to asset selector tree search',
        module: 'AssetSelectorTreeSearchModule',
        path: './src/selector/asset-selector-example/tree-search/asset-selector-tree-search.module.ts',
        description: 'An introduction to asset selector tree search example.',
        scope: 'self'
      },
      {
        name: 'Stepper',
        module: 'StepperModule',
        path: './src/stepper/stepper.module.ts',
        description: 'A simple stepper example.',
        scope: 'self'
      },
      {
        name: 'ApplicationCard',
        module: 'ApplicationCardExampleModule',
        path: './src/application-card/application-card-example.module.ts',
        description: 'Application card example.',
        scope: 'self'
      },
      {
        name: 'Hooking via service',
        module: 'HookStateModule',
        path: './src/hooks/state/hook-state.module.ts',
        description: 'This is an example for an Action added via service or factory.',
        scope: 'self'
      },
      {
        name: 'Hooking via service',
        module: 'HookDocsModule',
        path: './src/hooks/docs/hook-docs.module.ts',
        description: 'This is an example for an hook docs added via module or service.',
        scope: 'self'
      },
      {
        name: 'Device connection status',
        module: 'DeviceConnectionStatusExampleModule',
        path: './src/device-connection-status/device-connection-status-example.module.ts',
        description: 'This is an example of Device connection status icons.',
        scope: 'self'
      },
      {
        name: 'Pagination',
        module: 'PaginationExampleModule',
        path: './src/pagination/pagination-example.module.ts',
        description: 'This is an example for pagination.',
        scope: 'self'
      },
      {
        name: 'Typeahead',
        module: 'TypeaheadExampleModule',
        path: './src/typeahead/typeahead-example.module.ts',
        description: 'This is an example for the typeahead component.',
        scope: 'self'
      },
      {
        name: 'Countdown',
        module: 'CountdownExampleModule',
        path: './src/countdown/countdown-example.module.ts',
        description: 'This is an example for the countdown component.',
        scope: 'self'
      },
      {
        name: 'Bottom drawer',
        module: 'bottomDrawerExampleModuleProviders',
        path: './src/bottom-drawer/bottom-drawer.providers.ts',
        description: 'This is an example for the bottom drawer service.',
        scope: 'self'
      },
      {
        name: 'Widget Config Hook',
        module: 'widgetConfigHookProviders',
        path: './src/hooks/widget-config/widget-config.providers.ts',
        description: 'This is an example for the bottom drawer service.',
        scope: 'self'
      },
      {
        name: 'Widget Hook',
        module: 'widgetHookProviders',
        path: './src/hooks/widget/widget.providers.ts',
        description: 'This is an example for the bottom drawer service.',
        scope: 'self'
      },
      {
        name: 'AI Components',
        module: 'aiComponentsProviders',
        path: './src/ai/ai-components.providers.ts',
        description: 'Showcasing the most common AI components.',
        scope: 'self'
      },
      {
        name: 'Computed asset properties',
        module: 'computedAssetPropertiesProviders',
        path: '@c8y/ngx-components/computed-asset-properties',
        description: 'Set of predefined computed asset properties.',
        scope: 'self'
      },
      {
        name: 'Editor JSON sample',
        module: 'editorJSONSampleProviders',
        path: './src/editor/editor-json-sample/index.ts',
        description: 'This is an example for editing JSON via the editor component.',
        scope: 'self'
      },
      {
        name: 'Editor CSS sample',
        module: 'editorCSSSampleProviders',
        path: './src/editor/editor-css-sample/index.ts',
        description: 'This is an example for editing CSS via the editor component.',
        scope: 'self'
      }
    ]
  },
  buildTime: {
    extraWebpackConfig: {
      plugins: [
        new DefinePlugin({
          HELLO_WORLD: JSON.stringify('HELLO WORLD')
        })
      ]
    },
    // The embedded.css is used by codex for iframe embeddings.
    copy: [{ from: './node_modules/@c8y/style/embedded.css', to: './embedded.css' }],
    federation: [
      '@angular/animations',
      '@angular/cdk',
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/forms',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      '@angular/upgrade',
      '@c8y/client',
      '@c8y/ngx-components',
      'ngx-bootstrap',
      '@ngx-translate/core',
      '@ngx-formly/core'
    ]
  }
} as const satisfies ConfigurationOptions;
