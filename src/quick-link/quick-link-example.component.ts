import { Component } from '@angular/core';
import { gettext } from '@c8y/ngx-components/gettext';
import { CoreModule, DocLink, DocsService, QuickLinkModule } from '@c8y/ngx-components';

@Component({
  selector: 'quick-link-example',
  template: `<c8y-title>Quick link</c8y-title>
    <button
      class="btn-clean card text-pre-normal"
      *ngFor="let link of quickLinks"
      (click)="link.click ? link.click() : false"
    >
      <c8y-quick-link [icon]="link.icon" [label]="link.label"></c8y-quick-link>
    </button>`,
  standalone: true,
  imports: [QuickLinkModule, CoreModule]
})
export class QuickLinkExampleComponent {
  quickLinks = [];

  constructor(private docs: DocsService) {
    this.createQuicklinkUserGuide();
  }

  private createQuicklinkUserGuide() {
    const userGuide: Partial<DocLink> = {
      icon: 'c8y-user',
      label: gettext('User documentation'),
      url: '/docs/sector/getting_started',
      click: () => {
        const userGuideURL = this.docs.getUserGuideLink(userGuide.url) as string;
        window.open(userGuideURL);
      }
    };
    this.quickLinks.push(userGuide);
  }
}
