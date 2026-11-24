import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ActionBarItemComponent,
  DatePipe,
  DateTimePickerComponent,
  DropdownFitViewportDirective,
  EmptyStateComponent,
  FormGroupComponent,
  IconDirective,
  TitleComponent,
} from '@c8y/ngx-components';
import { IntervalPickerComponent } from '@c8y/ngx-components/interval-picker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'tut-dropdown-fit-viewport-example',
  templateUrl: './dropdown-fit-viewport-example.component.html',
  imports: [
    ReactiveFormsModule,
    BsDropdownModule,
    DropdownFitViewportDirective,
    ActionBarItemComponent,
    DateTimePickerComponent,
    FormGroupComponent,
    IntervalPickerComponent,
    EmptyStateComponent,
    IconDirective,
    TitleComponent,
    DatePipe,
  ],
})
export class DropdownFitViewportExampleComponent {
  readonly form = new FormGroup({
    interval: new FormControl('custom'),
    dateFrom: new FormControl(new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
    dateTo: new FormControl(new Date().toISOString()),
  });
}
