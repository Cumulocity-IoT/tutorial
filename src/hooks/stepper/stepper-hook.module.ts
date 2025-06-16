import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule, SetupStep, hookNavigator, hookStepper } from '@c8y/ngx-components';
import { BasicViewComponent } from './basic-view/basic-view.component';
import { Step1Component } from './steps/step1.component';
import { Step2Component } from './steps/step2.component';

const routes: Routes = [
  {
    path: 'stepper-hook',
    component: BasicViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CoreModule,
    BasicViewComponent,
    Step1Component,
    Step2Component
  ],
  /**
   * Adding the hooks to the providers:
   */
  providers: [
    hookNavigator({
      label: 'Stepper',
      icon: 'stairs',
      priority: 30,
      path: 'stepper-hook',
      parent: 'Hooks',
      // TODO: clarify why preventDuplicates is needed
      preventDuplicates: true
    }),
    hookStepper([
      {
        stepperId: 'example',
        component: Step1Component,
        label: 'Step 1',
        setupId: 'step1',
        priority: 100,
        // TODO: proper fix needed
        injector: null
      },
      {
        stepperId: 'example',
        component: Step2Component,
        label: 'Step 2',
        setupId: 'step2',
        priority: 90,
        // TODO: proper fix needed
        injector: null
      }
    ] as SetupStep[])
  ]
})
export class StepperHookModule {}
