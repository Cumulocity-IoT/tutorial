import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  FormGroupComponent,
  IconDirective,
  TitleComponent,
  C8yTranslatePipe,
} from '@c8y/ngx-components';
import { gettext } from '@c8y/ngx-components/gettext';

type PermissionColumn = 'read' | 'admin' | 'create' | 'update';

/** One row of the permissions matrix; `undefined` means the column does not apply to the type. */
interface PermissionRow {
  id: string;
  label: string;
  read?: boolean;
  admin?: boolean;
  create?: boolean;
  update?: boolean;
}

interface Application {
  id: string;
  name: string;
  contextPath: string;
  icon: string;
  /** Provided by the parent tenant, as opposed to uploaded by this tenant. */
  subscribed: boolean;
}

const ROLE = {
  name: 'admins',
  description:
    'Enables administrative permissions. The first user created for the tenant receives this role.',
};

@Component({
  selector: 'c8y-entity-detail-wide-form-example',
  templateUrl: './entity-detail-wide-form-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    FormGroupComponent,
    TitleComponent,
    ReactiveFormsModule,
    IconDirective,
    C8yTranslatePipe,
  ],
})
export class EntityDetailWideFormExampleComponent {
  // Hardcoded for the example. The real page loads the role through UserGroupService and the
  // permission types through UserRoleService from @c8y/client.
  protected readonly form = inject(FormBuilder).group({
    name: [ROLE.name, Validators.required],
    description: [ROLE.description],
  });

  protected readonly columns: { key: PermissionColumn; label: string }[] = [
    { key: 'read', label: gettext('Read') },
    { key: 'admin', label: gettext('Admin') },
    { key: 'create', label: gettext('Create') },
    { key: 'update', label: gettext('Update') },
  ];

  protected readonly permissions = signal<PermissionRow[]>([
    { id: 'alarm', label: gettext('Alarms'), read: true, admin: true },
    { id: 'application', label: gettext('Application management'), read: true, admin: true },
    { id: 'audit', label: gettext('Audits'), read: true, admin: true },
    { id: 'binary', label: gettext('Binary'), read: false, admin: false, create: false },
    { id: 'bulk', label: gettext('Bulk operations'), read: true, admin: true },
    { id: 'device-control', label: gettext('Device control'), read: true, admin: true },
    { id: 'event', label: gettext('Events'), read: true, admin: true },
    { id: 'inventory', label: gettext('Inventory'), read: true, admin: true, create: true },
    { id: 'measurement', label: gettext('Measurements'), read: true, admin: true },
    { id: 'option', label: gettext('Option management'), read: true, admin: true },
    {
      id: 'tenant',
      label: gettext('Tenant management'),
      read: true,
      admin: true,
      create: true,
      update: true,
    },
    {
      id: 'user',
      label: gettext('User management'),
      read: true,
      admin: true,
      create: true,
      update: true,
    },
  ]);

  protected readonly applications: Application[] = [
    {
      id: 'administration',
      name: 'Administration',
      contextPath: 'administration',
      icon: 'c8y-administration',
      subscribed: true,
    },
    {
      id: 'cockpit',
      name: 'Cockpit',
      contextPath: 'cockpit',
      icon: 'c8y-cockpit',
      subscribed: true,
    },
    {
      id: 'devicemanagement',
      name: 'Device Management',
      contextPath: 'devicemanagement',
      icon: 'c8y-device-management',
      subscribed: true,
    },
    {
      id: 'digital-twin-manager',
      name: 'Digital Twin Manager',
      contextPath: 'digital-twin-manager',
      icon: 'c8y-enterprise',
      subscribed: true,
    },
    {
      id: 'streaming-analytics',
      name: 'Streaming Analytics',
      contextPath: 'streaming-analytics',
      icon: 'c8y-streaming-analytics',
      subscribed: true,
    },
    {
      id: 'fleet-dashboard',
      name: 'Fleet dashboard',
      contextPath: 'fleet-dashboard',
      icon: 'dashboard',
      subscribed: false,
    },
  ];
  protected readonly subscribedApplications = this.applications.filter((app) => app.subscribed);
  protected readonly customApplications = this.applications.filter((app) => !app.subscribed);

  protected readonly enabledApps = signal(
    new Set(['administration', 'cockpit', 'devicemanagement']),
  );

  /** True when every row that has the column has it checked. */
  allChecked(column: PermissionColumn): boolean {
    const rows = this.permissions().filter((row) => row[column] !== undefined);
    return rows.length > 0 && rows.every((row) => row[column]);
  }

  toggleAll(column: PermissionColumn): void {
    const value = !this.allChecked(column);
    this.permissions.update((rows) =>
      rows.map((row) => (row[column] === undefined ? row : { ...row, [column]: value })),
    );
    this.form.markAsDirty();
  }

  togglePermission(id: string, column: PermissionColumn): void {
    this.permissions.update((rows) =>
      rows.map((row) => (row.id === id ? { ...row, [column]: !row[column] } : row)),
    );
    this.form.markAsDirty();
  }

  toggleApp(appId: string): void {
    this.enabledApps.update((apps) => {
      const next = new Set(apps);
      if (next.has(appId)) {
        next.delete(appId);
      } else {
        next.add(appId);
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
    this.form.reset(ROLE);
    this.enabledApps.set(new Set(['administration', 'cockpit', 'devicemanagement']));
  }
}
