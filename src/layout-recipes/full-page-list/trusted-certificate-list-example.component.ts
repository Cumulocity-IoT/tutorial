import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITrustedCertificate } from '@c8y/client';
import {
  ActionBarItemComponent,
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  EmptyStateComponent,
  HelpComponent,
  IconDirective,
  ListGroupComponent,
  ListItemBodyComponent,
  ListItemCollapseComponent,
  ListItemComponent,
  ListItemIconComponent,
  TitleComponent,
  C8yTranslatePipe,
  DatePipe,
} from '@c8y/ngx-components';

type TrustedCertificate = Pick<
  ITrustedCertificate,
  | 'fingerprint'
  | 'name'
  | 'status'
  | 'algorithmName'
  | 'version'
  | 'notBefore'
  | 'notAfter'
  | 'issuer'
  | 'serialNumber'
  | 'autoRegistrationEnabled'
  | 'proofOfPossessionValid'
  | 'tenantCertificateAuthority'
>;

@Component({
  selector: 'c8y-trusted-certificate-list-example',
  templateUrl: './trusted-certificate-list-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TitleComponent,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    HelpComponent,
    ActionBarItemComponent,
    ListGroupComponent,
    ListItemComponent,
    ListItemBodyComponent,
    ListItemIconComponent,
    ListItemCollapseComponent,
    EmptyStateComponent,
    IconDirective,
    FormsModule,
    DatePipe,
    C8yTranslatePipe,
  ],
})
export class TrustedCertificateListExampleComponent {
  protected readonly reloading = signal(false);

  // Hardcoded for the example. The real page loads TrustedCertificateService.list() from @c8y/client.
  protected readonly certificates = signal<TrustedCertificate[]>([
    {
      fingerprint: '7a3f9c1e5b2d8a4f6c0e1d2b3a4c5d6e7f8091a2',
      name: 'Production device CA',
      status: 'ENABLED',
      algorithmName: 'SHA256withRSA',
      version: 3,
      notBefore: '2025-01-15T09:00:00Z',
      notAfter: '2030-01-14T09:00:00Z',
      issuer: 'CN=Example Root CA, O=Example Corp, C=DE',
      serialNumber: '4f2a9b7c1d3e5f60',
      autoRegistrationEnabled: true,
      proofOfPossessionValid: true,
      tenantCertificateAuthority: false,
    },
    {
      fingerprint: 'b1c2d3e4f5061728394a5b6c7d8e9f0011223344',
      name: 'Factory line 2 gateways',
      status: 'DISABLED',
      algorithmName: 'SHA256withECDSA',
      version: 3,
      notBefore: '2024-06-01T00:00:00Z',
      notAfter: '2027-05-31T23:59:59Z',
      issuer: 'CN=Factory Intermediate CA, O=Example Corp, C=DE',
      serialNumber: '0a1b2c3d4e5f6071',
      autoRegistrationEnabled: false,
      proofOfPossessionValid: false,
      tenantCertificateAuthority: false,
    },
    {
      fingerprint: 'c0ffee00112233445566778899aabbccddeeff01',
      name: 'Tenant certificate authority',
      status: 'ENABLED',
      algorithmName: 'SHA256withRSA',
      version: 3,
      notBefore: '2025-03-10T12:00:00Z',
      notAfter: '2035-03-09T12:00:00Z',
      issuer: 'CN=t12345 CA, O=Cumulocity, C=DE',
      serialNumber: '9e8d7c6b5a493827',
      autoRegistrationEnabled: true,
      proofOfPossessionValid: true,
      tenantCertificateAuthority: true,
    },
    {
      fingerprint: 'deadbeef0123456789abcdef0123456789abcdef',
      name: 'Legacy sensors',
      status: 'ENABLED',
      algorithmName: 'SHA1withRSA',
      version: 1,
      notBefore: '2016-10-01T00:00:00Z',
      notAfter: '2026-10-01T00:00:00Z',
      issuer: 'CN=Legacy Sensor CA, O=Example Corp, C=DE',
      serialNumber: '1122334455667788',
      autoRegistrationEnabled: false,
      proofOfPossessionValid: true,
      tenantCertificateAuthority: false,
    },
  ]);

  reload(): void {
    this.reloading.set(true);
    setTimeout(() => this.reloading.set(false), 1200);
  }

  // The real page opens the add-certificate modal here.
  addCertificate(): void {}

  deleteCertificate(certificate: TrustedCertificate): void {
    this.certificates.update((certs) =>
      certs.filter((c) => c.fingerprint !== certificate.fingerprint),
    );
  }
}
