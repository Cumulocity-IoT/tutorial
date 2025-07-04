import { NgModule } from '@angular/core';
import { hookNavigator, hookPreview, hookRoute } from '@c8y/ngx-components';
import { BehaviorSubject } from 'rxjs';
import { ExampleCustomPreviewFeatureNavigationFactory } from './preview-feature-custom.factory';

// needed only for the example, we will store the state in local storage
const LOCAL_STORAGE_KEY = 'customPreviewFeatureState';
const savedState = localStorage.getItem(LOCAL_STORAGE_KEY) === 'true';
const customPreviewFeatureState$ = new BehaviorSubject<boolean>(savedState);

/**
 * Use our predefined InjectionTokens and provide your own classes to extend behavior
 * and functionality of existing ones. Implement your own NavigationNodes, Tabs, Actions and Breadcrumbs.
 * Note: Hooks should always be implemented in the module where they are used, so that
 * a module can act standalone and has no dependencies on other modules.
 */
export const customHooks = [
  hookRoute({
    path: 'hooks/preview-feature-custom',
    loadComponent: () =>
      import('./basic-view-custom.component').then(m => m.CustomBasicViewComponent)
  }),
  hookNavigator(ExampleCustomPreviewFeatureNavigationFactory),
  hookPreview({
    active$: customPreviewFeatureState$.asObservable(),
    onToggle: async (state: boolean) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, String(state));
      customPreviewFeatureState$.next(state);
      return true;
    },
    label: 'Custom feature preview',
    description: () => Promise.resolve('This is a custom feature'),
    settings: {
      reload: true
    }
  })
];

@NgModule({
  /**
   * Adding the hooks to the providers:
   */
  providers: [...customHooks]
})
export class PreviewFeatureCustomModule {}
