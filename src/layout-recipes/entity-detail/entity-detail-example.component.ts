import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  FormGroupComponent,
  TitleComponent,
  C8yTranslatePipe,
} from '@c8y/ngx-components';

interface Role {
  id: string;
  name: string;
  description: string;
}

const USER = {
  username: 'john.doe',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1 555 0100',
};
const ASSIGNED_ROLES = ['admins', 'devices'];

@Component({
  selector: 'c8y-entity-detail-example',
  templateUrl: './entity-detail-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    FormGroupComponent,
    TitleComponent,
    ReactiveFormsModule,
    C8yTranslatePipe,
  ],
})
export class EntityDetailExampleComponent {
  // Hardcoded for the example. The real page loads the user through UserService and the global
  // roles through UserGroupService from @c8y/client.
  protected readonly form = inject(FormBuilder).group({
    username: [{ value: USER.username, disabled: true }],
    email: [USER.email, [Validators.required, Validators.email]],
    firstName: [USER.firstName],
    lastName: [USER.lastName],
    phone: [USER.phone],
  });

  protected readonly roles: Role[] = [
    { id: 'admins', name: 'admins', description: 'Full administrative access to the tenant' },
    { id: 'business', name: 'business', description: 'Read-only access to dashboards and reports' },
    { id: 'devices', name: 'devices', description: 'Manage devices, firmware, and software' },
    {
      id: 'globalManager',
      name: 'Global Manager',
      description: 'Manage users, roles, and tenant settings',
    },
    {
      id: 'globalReader',
      name: 'Global Reader',
      description: 'Read-only access to all platform data',
    },
    {
      id: 'globalUserManager',
      name: 'Global User Manager',
      description: 'Create and manage user accounts',
    },
  ];

  protected readonly assignedRoles = signal(new Set(ASSIGNED_ROLES));

  toggleRole(roleId: string): void {
    this.assignedRoles.update((roles) => {
      const next = new Set(roles);
      if (next.has(roleId)) {
        next.delete(roleId);
      } else {
        next.add(roleId);
      }
      return next;
    });
    this.form.markAsDirty();
  }

  save(): void {
    if (this.form.valid) {
      this.form.markAsPristine();
    }
  }

  cancel(): void {
    this.form.reset({ ...USER, username: { value: USER.username, disabled: true } });
    this.assignedRoles.set(new Set(ASSIGNED_ROLES));
  }
}
