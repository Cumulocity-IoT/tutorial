import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, NavigatorNode, hookNavigator, hookRoute } from '@c8y/ngx-components';
import { StepperService } from './stepper.service';

@NgModule({
  imports: [CoreModule, FormsModule, ReactiveFormsModule],
  providers: [
    StepperService,
    hookRoute({
      path: 'stepper',
      loadComponent: () => import('./stepper.component').then(m => m.StepperComponent)
    }),
    hookNavigator(
      new NavigatorNode({
        label: 'Stepper',
        path: '/stepper',
        icon: 'step-forward',
        priority: 10
      })
    )
  ]
})
export class StepperModule {}
