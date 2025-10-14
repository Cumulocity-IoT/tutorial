import { Component, ViewChild } from '@angular/core';
import { EditorComponent, MonacoEditorMarkerValidatorDirective } from '@c8y/ngx-components/editor';
import { FormGroupComponent, MessagesComponent } from '@c8y/ngx-components';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'c8y-editor-css-sample',
  templateUrl: './editor-css-sample.component.html',
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
export class EditorCSSSampleComponent {
  form: FormGroup;
  @ViewChild(EditorComponent) editorComponent!: EditorComponent;

  constructor() {
    this.form = new FormGroup({
      cssEditor: new FormControl('.test { display: none; }')
    });
  }
}
