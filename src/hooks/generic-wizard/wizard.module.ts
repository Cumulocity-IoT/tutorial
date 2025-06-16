import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule, hookNavigator, hookWizard, hookTab } from '@c8y/ngx-components';
import { MinimalSetupComponent } from './minimal-setup/minimal-setup.component';
import { MultipleEntriesOne } from './minimal-setup/multiple-entries-one.component';
import { MultipleEntriesTwo } from './minimal-setup/multiple-entries-two.component';
import { StepperExampleComponent } from './minimal-setup/stepper-example.component';
import { WizardTabs } from './wizard-tabs';
import { ContainerComponent } from './wizard.component';

const routes: Routes = [
  {
    path: 'wizard',
    redirectTo: 'wizard/minimal-setup'
  },
  {
    path: 'wizard/minimal-setup',
    component: ContainerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MinimalSetupComponent,
    MultipleEntriesOne,
    MultipleEntriesTwo
  ],
  /**
   * Adding the hooks to the providers:
   */
  providers: [
    hookTab(WizardTabs),
    hookNavigator({
      label: 'Wizard',
      icon: 'body',
      priority: 0,
      path: 'wizard/minimal-setup',
      parent: 'Hooks',
      // TODO: clarify why preventDuplicates is needed
      preventDuplicates: true
    }),
    hookWizard({
      wizardId: 'singleEntry',
      // The container component is responsible for handling subsequent steps in the wizard.
      component: MinimalSetupComponent,
      // Menu entry name
      name: "Doesn't matter as it won't be shown anyway since it is a single entry.",
      // Menu entry icon
      c8yIcon: 'upload'
    }),
    hookWizard({
      // entry ID, observe that it shares the same ID as the entry below.
      wizardId: 'multipleEntries',
      // The container component is responsible for handling subsequent steps in the wizard.
      component: MultipleEntriesOne,
      // Menu entry name
      name: 'Entry 1',
      // Menu entry icon
      c8yIcon: 'upload'
    }),
    hookWizard({
      wizardId: 'multipleEntries',
      // The container component is responsible for handling subsequent steps in the wizard.
      component: MultipleEntriesTwo,
      // Menu entry name
      name: 'Entry 2',
      // Menu entry icon
      c8yIcon: 'upload'
    }),
    hookWizard({
      wizardId: 'stepperExample',
      // The container component is responsible for handling subsequent steps in the wizard.
      component: StepperExampleComponent,
      // Menu entry name
      name: "Doesn't matter as it won't be shown anyway since it is a single entry.",
      // Menu entry icon
      c8yIcon: 'upload'
    })
  ]
})
export class WizardModule {}
