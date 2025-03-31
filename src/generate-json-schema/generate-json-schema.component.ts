import { Component, OnInit } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-generate-json-schema',
  template: `
    <h3>Base interface</h3>
    <pre>{{ baseInterface }}</pre>
    <pre>{{ referencedInterfaces }}</pre>
    <h3>JSON Schema generated from ExampleInterface</h3>
    <pre>{{ schemaString }}</pre>
  `,
  standalone: true,
  imports: [CoreModule]
})
export class GenerateJsonSchemaComponent implements OnInit {
  schemaString: unknown;
  baseInterface = `
  export type ExampleInterface = {
    name: string;
    id: number;
    location: Address;
    children?: Children[] | null;
  }
  `;
  referencedInterfaces = `
  export type Address ={
    street: string;
    city: string;
  }

  export type Children = {
    name: string;
    id: number;
  }
  `;

  async ngOnInit() {
    const { schema } = await import(
      'c8y-schema-loader?interfaceName=ExampleInterface!./schema-example.model'
    );
    this.schemaString = JSON.stringify(schema, null, 2);
  }
}
