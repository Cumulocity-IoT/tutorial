import { EnvironmentProviders, Provider } from '@angular/core';
import { NavigatorNode, hookNavigator } from '@c8y/ngx-components';

/**
 * Registers the group nodes the layout recipe examples attach to by label. Each example ships its
 * own route and navigator node in its `*.providers.ts`, exposed through `cumulocity.config.ts`.
 */
export function provideLayoutRecipesSamples(): (Provider | EnvironmentProviders)[] {
  return [
    hookNavigator(
      new NavigatorNode({ label: 'Layout recipes', icon: 'c8y-layout', priority: 195 }),
    ),
    hookNavigator(
      new NavigatorNode({
        label: 'Full-page list',
        icon: 'list',
        parent: 'Layout recipes',
        priority: 100,
      }),
    ),
    hookNavigator(
      new NavigatorNode({
        label: 'Entity detail',
        icon: 'file-view',
        parent: 'Layout recipes',
        priority: 80,
      }),
    ),
  ];
}
