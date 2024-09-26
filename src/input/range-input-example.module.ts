import { NgModule } from '@angular/core';
import { RangeInputExampleComponent } from './range-input-example.component';
import { hookNavigator, hookRoute } from '@c8y/ngx-components';

@NgModule({
  providers: [
    hookRoute({
      path: 'range-input',
      component: RangeInputExampleComponent
    }),
    hookNavigator({
      priority: 20,
      path: '/range-input',
      icon: 'form',
      label: 'Range Input examples'
    })
  ]
})
export class RangeInputExampleModule {}
