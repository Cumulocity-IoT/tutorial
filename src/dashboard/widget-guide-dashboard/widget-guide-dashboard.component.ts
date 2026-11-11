import { Component, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tut-widget-guide-dashboard',
  template: `
    <c8y-title>Widget guide dashboard</c8y-title>
    <c8y-action-bar-item [placement]="'right'">
      <button
        class="btn btn-link"
        title="{{ editMode ? 'Disable edit mode' : 'Enable edit mode' }}"
        type="button"
        (click)="editMode = !editMode; editComponent = false"
      >
        <i [c8yIcon]="editMode ? 'lock' : 'unlock'"></i>
        {{ editMode ? 'Disable edit mode' : 'Enable edit mode' }}
      </button>
    </c8y-action-bar-item>
    <c8y-dashboard>
      <!-- Dashboard child with a dynamic component -->
      <c8y-dashboard-child [editMode]="editMode" [width]="10" [height]="4">
        <c8y-dashboard-child-title>
          <span>Dynamic component child title</span>
        </c8y-dashboard-child-title>
        <c8y-dashboard-child-action>
          <button
            title="{{ 'Configure this widget' }}"
            type="button"
            (click)="editComponent = !editComponent; (false)"
          >
            <i [c8yIcon]="'cog'"></i>
            {{ !editComponent ? 'Configure this widget' : 'Close configuration' }}
          </button>
        </c8y-dashboard-child-action>
        <div class="card-block">
          <form name="form" #configForm="ngForm">
            <!--            important -->
            <c8y-dynamic-component
              componentId="angular.widget.demo"
              [config]="{ text: 'Hello world' }"
              [mode]="editComponent ? 'config' : 'component'"
            ></c8y-dynamic-component>
            <!--            /important-->
          </form>
        </div>
      </c8y-dashboard-child>
    </c8y-dashboard>
  `,
  standalone: true,
  imports: [CommonModule, CoreModule],
  // Eager: the widget renders through c8y-dynamic-component, which relies on zone.js.
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class WidgetGuideDashboardComponent implements OnDestroy {
  editMode = false;
  editComponent = false;

  @ViewChild('configForm', { static: false })
  configForm: NgForm;

  subscription: Subscription;

  ngAfterViewInit() {
    this.subscription = this.configForm.valueChanges.subscribe((value) =>
      console.log('Widget config:', value),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
