import { hookRoute } from '@c8y/ngx-components';
import { HelloComponent } from './hello.component';

export function provideHelloSample() {
  return [
    hookRoute([
      {
        path: '',
        redirectTo: 'hello',
        pathMatch: 'full'
      },
      {
        path: 'hello',
        component: HelloComponent
      }
    ])
  ];
}
