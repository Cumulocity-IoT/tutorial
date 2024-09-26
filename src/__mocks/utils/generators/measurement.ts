import { IMeasurement, IMeasurementValue } from '@c8y/client';
import { generateId, getFakeSource } from '../common';

export function getFakeMeasurement(): IMeasurement {
  return {
    id: generateId(),
    type: 'c8y_Temperature',
    time: new Date().toISOString(),
    self: 'https://example.com/measurement/measurements/...',
    source: getFakeSource(),
    c8y_Temperature: {
      T: getFakeMeasurementValue()
    }
  };
}

function getFakeMeasurementValue(): IMeasurementValue {
  return {
    value: Math.random() * 100,
    unit: `ºC`
  };
}
