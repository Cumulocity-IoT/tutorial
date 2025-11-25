import { hookNavigator, hookRoute, NavigatorNode } from '@c8y/ngx-components';

export const aiComponentsProviders = [
  hookRoute({
    path: 'ai/chat',
    loadComponent: () => import('./ai-chat-example.component').then(m => m.ChatExampleComponent)
  }),
  hookNavigator(
    new NavigatorNode({
      priority: 75,
      path: 'ai/chat',
      icon: 'chat',
      label: 'AI Chat',
      parent: 'AI'
    })
  )
];
