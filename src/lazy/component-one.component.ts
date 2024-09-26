import { Component } from '@angular/core';
import { InventoryService } from '@c8y/client';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '@c8y/ngx-components';

@Component({
  selector: 'cmp-lazy1',
  template: `
    <c8y-title>{{ 'Groups' }}</c8y-title>
    <div class="card">
      <div class="card-block">
        <p *ngFor="let o of mos">{{ o.id }} - {{ o.name }}</p>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, HeaderModule]
})
export class ComponentOne {
  mos: any[];
  constructor(private inventory: InventoryService) {
    this.fetch();
  }
  async fetch() {
    const { data } = await this.inventory.list({ type: 'c8y_DeviceGroup', pageSize: 100 });
    this.mos = data;
  }
}
