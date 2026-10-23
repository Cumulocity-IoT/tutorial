import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  FormGroupComponent,
  IconDirective,
  TitleComponent,
  C8yTranslatePipe,
} from '@c8y/ngx-components';
import { gettext } from '@c8y/ngx-components/gettext';

type InventoryPermission = 'READ' | 'ADMIN' | '*';

interface PermissionEntry {
  id: number;
  /** Managed object type the permission applies to; `*` means every type. */
  type: string;
  permission: InventoryPermission;
}

interface PermissionScope {
  id: string;
  label: string;
  permissions: PermissionEntry[];
}

const ROLE = {
  name: 'Manager',
  description:
    'Can read all data of the asset and manage all inventory data, but cannot perform operations. Can also acknowledge and clear alarms.',
};

@Component({
  selector: 'c8y-entity-detail-narrow-form-example',
  templateUrl: './entity-detail-narrow-form-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    FormGroupComponent,
    TitleComponent,
    ReactiveFormsModule,
    FormsModule,
    IconDirective,
    C8yTranslatePipe,
  ],
})
export class EntityDetailNarrowFormExampleComponent {
  private nextId = 100;

  // Hardcoded for the example. The real page loads the role through InventoryRoleService from
  // @c8y/client.
  protected readonly form = inject(FormBuilder).group({
    name: [ROLE.name, Validators.required],
    description: [ROLE.description],
  });

  protected readonly permissionOptions: { value: InventoryPermission; label: string }[] = [
    { value: 'READ', label: gettext('Read') },
    { value: 'ADMIN', label: gettext('Change') },
    { value: '*', label: gettext('All') },
  ];

  protected readonly scopes = signal<PermissionScope[]>([
    {
      id: 'ALARM',
      label: gettext('Alarms'),
      permissions: [{ id: 1, type: '*', permission: 'ADMIN' }],
    },
    { id: 'AUDIT', label: gettext('Audits'), permissions: [] },
    { id: 'EVENT', label: gettext('Events'), permissions: [] },
    {
      id: 'MANAGED_OBJECT',
      label: gettext('Inventory'),
      permissions: [{ id: 2, type: '*', permission: 'ADMIN' }],
    },
    {
      id: 'MEASUREMENT',
      label: gettext('Measurements'),
      permissions: [{ id: 3, type: '*', permission: 'READ' }],
    },
    { id: 'OPERATION', label: gettext('Device control'), permissions: [] },
  ]);

  addPermission(scopeId: string): void {
    this.updateScope(scopeId, (permissions) => [
      ...permissions,
      { id: this.nextId++, type: '*', permission: 'READ' },
    ]);
  }

  removePermission(scopeId: string, permissionId: number): void {
    this.updateScope(scopeId, (permissions) => permissions.filter((p) => p.id !== permissionId));
  }

  save(): void {
    if (this.form.valid) {
      this.form.markAsPristine();
    }
  }

  cancel(): void {
    this.form.reset(ROLE);
  }

  private updateScope(
    scopeId: string,
    change: (permissions: PermissionEntry[]) => PermissionEntry[],
  ): void {
    this.scopes.update((scopes) =>
      scopes.map((scope) =>
        scope.id === scopeId ? { ...scope, permissions: change(scope.permissions) } : scope,
      ),
    );
    this.form.markAsDirty();
  }
}
