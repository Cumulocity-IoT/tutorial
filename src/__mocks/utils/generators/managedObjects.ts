import { IManagedObject, IManagedObjectReferences } from '@c8y/client';
import { generateId } from '../common';

const cords = [
  {
    lat: '51.225324115117',
    lng: '6.758050918579102'
  },
  {
    lat: '51.22446407082351',
    lng: '6.75933837890625'
  },
  {
    lat: '51.22338899285697',
    lng: '6.760711669921875'
  },
  {
    lat: '51.222152622151995',
    lng: '6.762084960937499'
  },
  {
    lat: '51.2212387615908',
    lng: '6.763544082641601'
  },
  {
    lat: '51.21994857461735',
    lng: '6.765260696411133'
  },
  {
    lat: '51.21828202959081',
    lng: '6.766977310180663'
  },
  {
    lat: '51.21731433059918',
    lng: '6.769466400146484'
  },
  {
    lat: '51.21849707104884',
    lng: '6.771183013916016'
  },
  {
    lat: '51.219034670299344',
    lng: '6.772127151489258'
  }
];

export function generateRealtimeDeviceMO(): IManagedObject {
  return generateDevice<{ id: string; customFragment: string }>({
    id: '1',
    customFragment: 'customFragment'
  });
}

export function generateDevice<T>(customAttributes?: T): IManagedObject {
  const randomPosition = Math.floor(Math.random() * 10);
  return {
    id: generateId(),
    name: `Child_Device_${generateId()}`,
    ...getMOCommonProps(),
    type: 'c8y_SensorPhone',
    c8y_IsDevice: {},
    c8y_Position: {
      lng: cords[randomPosition].lng,
      alt: 0,
      accuracy: 10,
      lat: cords[randomPosition].lat
    },
    ...customAttributes
  };
}

export function generateAsset<T>(customAttributes?: T): IManagedObject {
  return {
    id: generateId(),
    name: `Asset_${generateId()}`,
    ...getMOCommonProps(),
    type: 'building',
    c8y_IsAsset: {},
    c8y_IsDeviceGroup: {},
    icon: {
      name: 'hospital-o',
      category: 'userInterface'
    },
    ...customAttributes
  };
}

export function generateAssetType<T>(customAttributes?: T): IManagedObject {
  return {
    id: generateId(),
    name: 'building',
    ...getMOCommonProps(),
    type: 'lemon',
    c8y_IsAssetType: {
      allowedAssetTypes: [
        {
          id: generateId()
        }
      ],
      isNoneChildAssetsAllowed: 'false',
      icon: {
        name: 'hospital-o',
        category: 'userInterface'
      },
      properties: []
    },
    description: '...',
    label: 'Building',
    ...customAttributes
  };
}

export function generateGroup<T>(customAttributes?: T): IManagedObject {
  return {
    id: generateId(),
    name: `Group_${generateId()}`,
    ...getMOCommonProps(),
    type: 'c8y_DeviceGroup',
    c8y_IsDeviceGroup: {},
    ...customAttributes
  };
}

export function generateSubGroup<T>(customAttributes?: T): IManagedObject {
  return generateGroup({
    name: `Sub_Group_${generateId()}`,
    type: 'c8y_DeviceSubgroup',
    ...customAttributes
  });
}

export function generateRandomMo() {
  const randomPosition = Math.floor(Math.random() * 3);
  const generators = [generateAsset, generateSubGroup, generateDevice];
  return generators[randomPosition]();
}

function getMOCommonProps() {
  return {
    creationTime: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    owner: 'owner1',
    self: 'http://example.com/self/...',
    additionParents: getFakeManagedObjectReferences(),
    assetParents: getFakeManagedObjectReferences(),
    childAdditions: getFakeManagedObjectReferences(),
    childAssets: getFakeManagedObjectReferences(),
    childDevices: getFakeManagedObjectReferences(),
    deviceParents: getFakeManagedObjectReferences(),
    ['customFragment']: 'customData'
  };
}

function getFakeManagedObjectReferences(): IManagedObjectReferences {
  return { references: [] };
}

export function generateDashboard({
  id = '6000',
  name = 'example-widget',
  globalRolesIds = undefined,
  device = undefined
} = {}) {
  const dashboard = {
    id: id,
    c8y_Global: {},
    c8y_Dashboard: {
      c8y_IsNavigatorNode: null,
      children: {
        [id]: {
          componentId: 'angular.widget.demo',
          _x: 3,
          _y: 0,
          id: id,
          title: 'Demo Widget Example',
          _width: 6,
          config: {
            text: 'This text is configured via the widget settings. Click the edit button to change it!'
          },
          _height: 6
        }
      },
      widgetClasses: {
        'dashboard-theme-light': true,
        'panel-title-regular': true
      }
    },
    [`c8y_Dashboard!name!${name}`]: {}
  };

  if (globalRolesIds) {
    (dashboard.c8y_Dashboard as any).globalRolesIds = globalRolesIds;
  }

  if (device) {
    (dashboard.c8y_Dashboard.children[id].config as any).device = device;
  }

  return dashboard;
}

export function generateUserPreferences() {
  return {
    type: 'c8y_UserPreference',
    id: generateId(),
    language: 'en'
  };
}
