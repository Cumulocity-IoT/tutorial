import { IFetchResponse } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { Observable } from 'rxjs';
import { generateResponse, handleRequest } from '../utils/common';

export class MeasurementsInterceptor implements HttpInterceptor {
  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    return handleRequest(req, next, 'measurement/measurements', {
      POST: this.mockPOST.bind(this),
      PUT: this.mockPUT.bind(this),
      GET: this.mockGET.bind(this)
    });
  }

  private mockPOST(_requestDescriptor) {
    return null;
  }

  private mockPUT(_requestDescriptor) {
    return null;
  }

  private mockGET(_requestDescriptor: string) {
    if (_requestDescriptor.includes('measurement/measurements/series')) {
      return this.mockSeriesGET(_requestDescriptor);
    }

    const responseGenerators = this.getResponseGenerators();

    for (const urlPart in responseGenerators) {
      if (_requestDescriptor.includes(urlPart)) {
        const generatorResult = responseGenerators[urlPart]();
        if (generatorResult) {
          return generateResponse(() => generatorResult);
        }
      }
    }
    return null;
  }

  private mockSeriesGET(_requestDescriptor: string) {
    const jsonMatch = _requestDescriptor.match(/series(.*)$/);

    if (!jsonMatch || !jsonMatch[1]) {
      return null;
    }

    let params: any = {};
    try {
      params = JSON.parse(jsonMatch[1]);
    } catch (e) {
      console.error('Failed to parse series params', e);
      return null;
    }

    const { dateFrom, dateTo, series } = params;

    if (!dateFrom || !dateTo) {
      return null;
    }

    const start = new Date(dateFrom);
    const end = new Date(dateTo);
    const values: Record<string, { min: number; max: number }[]> = {};

    const current = new Date(start);
    current.setMinutes(0, 0, 0);

    while (current <= end) {
      const timestamp = current.toISOString();

      const baseValue = 50 + Math.sin(current.getTime() / (1000 * 60 * 60 * 6)) * 30;
      const variation = Math.random() * 20 - 10;
      const value = Math.max(0, Math.min(100, baseValue + variation));

      values[timestamp] = [
        {
          min: Number(value.toFixed(2)),
          max: Number(value.toFixed(2))
        }
      ];

      current.setHours(current.getHours() + 1);
    }

    let seriesInfo = {
      unit: '%',
      name: 'Battery',
      type: 'c8y_Battery'
    };

    if (series?.includes('c8y_Temperature')) {
      seriesInfo = {
        unit: '°C',
        name: 'T',
        type: 'c8y_Temperature'
      };
    }

    return generateResponse(() => ({
      values,
      series: [seriesInfo],
      truncated: false
    }));
  }

  private getResponseGenerators() {
    return {
      c8y_Battery: () => ({
        measurements: [
          {
            id: '10000',
            type: 'c8y_Battery',
            source: {
              id: '20000'
            },
            c8y_Battery: {
              Battery: {
                unit: '%',
                value: 67
              }
            }
          }
        ]
      })
    };
  }
}
