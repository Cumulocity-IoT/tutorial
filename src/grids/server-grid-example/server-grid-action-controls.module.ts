import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BuiltInActionType,
  GridConfigContext,
  hookDataGridActionControls
} from '@c8y/ngx-components';
import { isEqual } from 'lodash-es';
import { of } from 'rxjs';
import { ActionControlsFactory } from './server-grid-action-controls.factory';

/**
 * Demostrates how `hookDataGridActionControls` can be used to
 * add or override action controls in data grid.
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    hookDataGridActionControls({
      actionControls: {
        text: 'URL match',
        callback: item => console.dir(item),
        type: 'url',
        icon: 'console',
        /* Put icon on last position */
        priority: -Infinity
      },
      /* This action matches agains the URL to hook into a grid */
      matchesGrid: (route: ActivatedRoute) => {
        return isEqual(
          route.snapshot.url.map(segment => segment.path),
          ['grids', 'server-grid-example']
        );
      }
    }),
    hookDataGridActionControls({
      actionControls: [
        {
          text: 'Context match',
          callback: item => console.dir(item),
          type: 'context',
          icon: 'source-code',
          /* Negative priority places actions after the ones with no priority */
          priority: -100
        },
        /* Action controls can be displayed for specific records only */
        {
          text: 'Odd',
          callback: item => console.dir(item),
          type: 'odd',
          icon: 'rewind',
          showIf: device => Number.parseInt(device.id) % 2 === 1
        },
        {
          text: 'Even',
          callback: item => console.dir(item),
          type: 'even',
          icon: 'forward11',
          showIf: device => Number.parseInt(device.id) % 2 === 0
        },
        /* This action overrides the default 'Delete' action for 'Application' MOs only */
        {
          type: BuiltInActionType.Delete,
          callback: () => alert('This shows how to override default action,'),
          /* If you want to override a default action for all records simply always return `true` */
          showIf: item => item?.type?.startsWith('c8y_Application')
        },
        {
          text: 'Reload',
          /* You can use the `reload` callback to triger data reload after your action */
          callback: (item, reload) => {
            console.dir(item);
            reload();
          },
          type: 'reload',
          icon: 'refresh'
        }
      ],
      /* This action matches agains grid config context to hook into a grid */
      matchesGrid: (_: ActivatedRoute, context: GridConfigContext) => {
        /* `matchesGrid` can also resolve asynchronously */
        return of(context?.key === 'server-grid-example');
      }
    }),
    /* For finer control on actions you can also provide a factory */
    hookDataGridActionControls(ActionControlsFactory)
  ]
})
export class ServerGridActionControlsModule {}
