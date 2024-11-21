import { Component } from '@angular/core';
import { IManifest } from '@c8y/client';
import { CoreModule, PropertiesListItem } from '@c8y/ngx-components';

@Component({
  selector: 'tut-properties-list-example',
  templateUrl: './properties-list-example.component.html',
  standalone: true,
  imports: [CoreModule]
})
export class PropertiesListExampleComponent {
  readonly customData: any = {
    string: 'Hello, world!',
    number: 42,
    boolean: true,
    array: [1, 'two', false],
    object: { key: 'value' },
    null: null,
    undefined: undefined
  };

  readonly customProperties: PropertiesListItem[] = [
    {
      label: 'String property',
      key: 'string'
    },
    {
      label: 'Number property',
      key: 'number'
    },
    {
      label: 'Boolean property',
      key: 'boolean'
    },
    {
      label: 'Array property',
      key: 'array'
    },
    {
      label: 'Object property',
      key: 'object',
      transform: (object: any) => object.key
    },
    {
      label: 'Null property',
      key: 'null'
    },
    {
      label: 'Undefined property',
      key: 'undefined'
    }
  ];

  readonly archiveManifest: Partial<IManifest> = {
    author: 'Cumulocity IoT',
    homepage: 'https://cumulocity.com/docs/web/introduction/',
    keywords: ['Cumulocity', 'Plugin', 'Widget'],
    license: 'Apache 2.0',
    repository: {
      type: 'git',
      url: 'git+https://github.com/SoftwareAG/some-not-exisiting-repository.git'
    },
    requiredPlatformVersion: '>=10.18.0.0',
    version: '10.20.0.0',
    name: 'Application name',
    custom: 'Custom property value'
  };

  readonly specifiedPackageVersionProperties: PropertiesListItem[] = [
    {
      label: 'Author',
      key: 'author'
    },
    {
      label: 'Homepage',
      key: 'homepage',
      type: 'link',
      action: (event, link: string) => window.open(link, '_blank', 'noopener,noreferrer')
    },
    {
      label: 'Required platform version',
      key: 'requiredPlatformVersion'
    },
    {
      label: 'Version',
      key: 'version'
    },
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Custom property',
      key: 'custom'
    }
  ];

  readonly customPropertiesNoParse: PropertiesListItem[] = [
    {
      label: 'String property',
      key: 'string',
      value: this.customData.string,
      type: 'string'
    },
    {
      label: 'Number property',
      key: 'number',
      value: this.customData.number,
      type: 'string'
    },
    {
      label: 'Array property',
      key: 'array',
      value: this.customData.array,
      type: 'array'
    }
  ];
}
