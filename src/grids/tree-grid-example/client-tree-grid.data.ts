/** Just a sample set of data. */
export const data = [
  {
    id: '1000000001',
    name: 'SmartTemp XT-200 Environmental Sensor',
    serialNumber: 'SN-XT200-9F4G7K',
    firmwareVersion: '1.3.2',
    childNodes: [
      {
        id: '1000000101',
        name: 'Temperature Probe',
        serialNumber: 'CH-TEMP-234XF',
        firmwareVersion: '2.1.0',
        childNodes: [
          {
            id: '1000000111',
            name: 'Thermistor Core',
            serialNumber: 'CMP-TC-0021',
            firmwareVersion: '1.0.5'
          },
          {
            id: '1000000112',
            name: 'Shielding Module',
            serialNumber: 'CMP-SH-3992',
            firmwareVersion: '1.1.1'
          }
        ]
      },
      {
        id: '1000000102',
        name: 'Humidity Sensor',
        serialNumber: 'CH-HMD-92JF3',
        firmwareVersion: '2.0.3',
        childNodes: [
          {
            id: '1000000121',
            name: 'Moisture Grid',
            serialNumber: 'CMP-MG-1200',
            firmwareVersion: '1.0.2'
          },
          {
            id: '1000000122',
            name: 'Condensation Shield',
            serialNumber: 'CMP-CS-8902',
            firmwareVersion: '1.0.7'
          }
        ]
      }
    ]
  },
  {
    id: '1000000002',
    name: 'AquaSense Flow Meter V3',
    serialNumber: 'SN-AQ3-V3J8L2',
    firmwareVersion: '4.0.1',
    childNodes: [
      {
        id: '1000000201',
        name: 'Flow Rate Sensor',
        serialNumber: 'CH-FLOW-12LD9',
        firmwareVersion: '3.2.0',
        childNodes: [
          {
            id: '1000000211',
            name: 'Turbine Core',
            serialNumber: 'CMP-TUR-3456',
            firmwareVersion: '1.1.3'
          },
          {
            id: '1000000212',
            name: 'Velocity Encoder',
            serialNumber: 'CMP-VEL-0082',
            firmwareVersion: '1.0.9'
          }
        ]
      },
      {
        id: '1000000202',
        name: 'Pressure Gauge',
        serialNumber: 'CH-PRES-77XMN',
        firmwareVersion: '3.1.1',
        childNodes: [
          {
            id: '1000000221',
            name: 'Sensor Diaphragm',
            serialNumber: 'CMP-DIA-4712',
            firmwareVersion: '1.2.5'
          },
          {
            id: '1000000222',
            name: 'Analog-to-Digital Module',
            serialNumber: 'CMP-ADM-9913',
            firmwareVersion: '1.3.0'
          }
        ]
      }
    ]
  },
  {
    id: '1000000003',
    name: 'SkyLink Drone Beacon',
    serialNumber: 'SN-SKYB-239DKT',
    firmwareVersion: '2.5.0',
    childNodes: [
      {
        id: '1000000301',
        name: 'GPS Module',
        serialNumber: 'CH-GPS-0039H',
        firmwareVersion: '1.9.0',
        childNodes: [
          {
            id: '1000000311',
            name: 'Antenna Array',
            serialNumber: 'CMP-ANT-2100',
            firmwareVersion: '1.0.4'
          },
          {
            id: '1000000312',
            name: 'Triangulation Processor',
            serialNumber: 'CMP-TRI-3029',
            firmwareVersion: '1.1.2'
          }
        ]
      },
      {
        id: '1000000302',
        name: 'Altitude Sensor',
        serialNumber: 'CH-ALT-112PK',
        firmwareVersion: '2.4.3',
        childNodes: [
          {
            id: '1000000321',
            name: 'Barometric Core',
            serialNumber: 'CMP-BAR-0192',
            firmwareVersion: '1.0.8'
          },
          {
            id: '1000000322',
            name: 'Drift Compensator',
            serialNumber: 'CMP-DRF-6674',
            firmwareVersion: '1.2.1'
          }
        ]
      }
    ]
  }
];
