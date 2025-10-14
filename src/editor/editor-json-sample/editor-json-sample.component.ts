import { Component, ViewChild } from '@angular/core';
import { EditorComponent, MonacoEditorMarkerValidatorDirective } from '@c8y/ngx-components/editor';
import { FormGroupComponent, MessagesComponent } from '@c8y/ngx-components';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'c8y-editor-json-sample',
  templateUrl: './editor-json-sample.component.html',
  standalone: true,
  imports: [
    EditorComponent,
    MessagesComponent,
    FormGroupComponent,
    ReactiveFormsModule,
    MonacoEditorMarkerValidatorDirective
  ],
  host: {
    class: 'd-col fit-w',
    style: 'height: 400px'
  }
})
export class EditorJsonSampleComponent {
  form: FormGroup;
  @ViewChild(EditorComponent) editorComponent!: EditorComponent;

  constructor() {
    this.form = new FormGroup({
      jsonEditor: new FormControl(
        JSON.stringify({ name: 'John Doe', age: 30, email: 'john.doe@example.com' }, undefined, 2)
      )
    });
  }

  assignSchema() {
    const schema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of the person'
        },
        age: {
          type: 'integer',
          description: 'Age of the person',
          minimum: 0
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Email address of the person'
        }
      },
      required: ['name', 'age']
    } as const;
    this.editorComponent.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [{ schema, fileMatch: ['*'], uri: 'editor-json-sample' }],
      enableSchemaRequest: false,
      allowComments: false
    });
  }
}
