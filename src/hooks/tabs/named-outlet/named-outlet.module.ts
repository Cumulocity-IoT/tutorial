import { NgModule } from '@angular/core';
import {
  CoreModule,
  hookNavigator,
  hookRoute,
  hookTab,
  NavigatorNode,
  NavigatorNodeData
} from '@c8y/ngx-components';
import { RouterModule } from '@angular/router';
import { ContentAComponent } from './content-a.component';
import { ContentBComponent } from './content-b.component';
import { BasicViewComponent } from './basic-view/basic-view.component';

const hooks = [
  hookRoute([
    {
      path: 'hooks/named-outlet',
      component: BasicViewComponent,
      children: [
        {
          path: 'content-a',
          component: ContentAComponent,
          outlet: 'namedOutlet'
        },
        {
          path: 'content-b',
          component: ContentBComponent,
          outlet: 'namedOutlet'
        }
      ]
    }
  ]),
  hookTab([
    {
      label: 'Tab A',
      icon: 'web-design',
      priority: 20,
      featureId: 'A',
      path: [
        {
          outlets: {
            ['namedOutlet']: 'content-a'
          }
        }
      ],
      tabsOutlet: 'namedOutletTabs'
    },
    {
      label: 'Tab B',
      icon: 'web-design',
      priority: 10,
      featureId: 'B',
      path: [
        {
          outlets: {
            ['namedOutlet']: 'content-b'
          }
        }
      ],
      tabsOutlet: 'namedOutletTabs'
    }
  ]),
  hookNavigator(
    new NavigatorNode({
      priority: 55,
      path: 'hooks/named-outlet',
      icon: 'name-tag',
      label: 'Named router outlet',
      parent: 'Hooks'
    } as NavigatorNodeData)
  )
];

@NgModule({
  declarations: [BasicViewComponent],
  imports: [RouterModule, ContentAComponent, ContentBComponent, CoreModule],
  providers: [...hooks]
})
export class NamedOutletModule {}
