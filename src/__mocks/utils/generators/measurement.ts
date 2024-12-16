import { IMeasurement, IMeasurementValue } from '@c8y/client';
import { generateId, getFakeSource } from '../common';

const MEASUREMENT_UNITS: Record<string, string> = {
  c8y_Temperature: 'ºC',
  c8y_Battery: '%'
};

export function getFakeMeasurement(fragment = 'T', type = 'c8y_Temperature'): IMeasurement {
  return {
    id: generateId(),
    type: type,
    time: new Date().toISOString(),
    self: 'https://example.com/measurement/measurements/...',
    source: getFakeSource(),
    [type]: {
      [fragment]: getFakeMeasurementValue(type)
    }
  };
}

function getFakeMeasurementValue(type: string): IMeasurementValue {
  return {
    value: Math.random() * 100,
    unit: MEASUREMENT_UNITS[type] || ''
  };
}
