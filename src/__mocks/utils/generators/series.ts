import { ISeries } from '@c8y/client';

function createSeriesObject(
  timestamp: string,
  minValue: number,
  maxValue: number,
  unit: string,
  name: string,
  type: string
): ISeries {
  return {
    values: {
      [timestamp]: [
        {
          min: minValue,
          max: maxValue
        }
      ]
    },
    series: [
      {
        unit: unit,
        name: name,
        type: type
      }
    ],
    truncated: false
  };
}

export function generateFakeSeriesValues(
  unit = '\u00baC',
  name = 'T',
  type = 'c8y_Temperature'
): ISeries {
  const fakeTimestamp = new Date().toISOString();
  const fakeMinValue = parseFloat((Math.random() * 10).toFixed(10));
  const fakeMaxValue = fakeMinValue + parseFloat((Math.random() * 5).toFixed(10));

  return createSeriesObject(fakeTimestamp, fakeMinValue, fakeMaxValue, unit, name, type);
}
