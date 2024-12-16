import { IFetchResponse, IMeasurement } from '@c8y/client';
import { ApiCall, HttpHandler, HttpInterceptor } from '@c8y/ngx-components/api';
import { Observable } from 'rxjs';
import { generateResponse, handleRequest } from '../utils/common';
import { getFakeMeasurement } from '../utils/generators/measurement';
import { generateFakeSeriesValues as getFakeSeriesData } from '../utils/generators/series';

export class MeasurementsSeriesInterceptor implements HttpInterceptor {
  private headers: string;

  intercept(req: ApiCall, next: HttpHandler): Observable<IFetchResponse> {
    this.headers = req.options.headers;

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

  private async mockGET(
    requestDescriptor: string
  ): Promise<Response | { measurements: IMeasurement[] }> {
    if (requestDescriptor.includes('series')) {
      return this.generateSeriesResponse();
    }

    if (requestDescriptor.includes('c8y_Battery') && requestDescriptor.includes('Battery')) {
      const sourceValue = this.getSourceValue(requestDescriptor);

      return this.handleMeasurementRequest(sourceValue);
    }
  }

  private generateSeriesResponse(): Response {
    return generateResponse(() => getFakeSeriesData('%', 'Battery', 'c8y_Battery'));
  }

  private handleMeasurementRequest(sourceValue: string): Response {
    const contentType = this.headers['accept'];

    if (contentType === 'text/csv' || contentType === 'application/vnd.ms-excel') {
      // in case of excel, a simplified version of a file will be generated (csv with excel extension)
      return this.generateFakeFileResponse(contentType, sourceValue);
    }

    return generateResponse(() => this.getFakedMeasurementData('Battery', 'c8y_Battery'));
  }

  private generateFakeFileResponse(contentType: string, sourceValue: string): Response {
    return this.generateResponseWithFakeFile(
      () =>
        this.getFakeRawFile(
          sourceValue ? sourceValue : '123',
          'Some_fake_device_name',
          'c8y_Battery.Battery',
          Math.random() * 100,
          '%'
        ),
      contentType
    );
  }

  private getFakeRawFile(
    source: string,
    deviceName: string,
    fragmentSeries: string,
    value: number,
    unit: string
  ): string {
    const currentDate = new Date().toISOString();
    return `time,source,device_name,fragment.series,value,unit
  ${currentDate},${source},${deviceName},${fragmentSeries},${value},${unit}`;
  }

  private generateResponseWithFakeFile(bodyGenerator: () => string, contentType: string): Response {
    const response = bodyGenerator();

    return new Response(response, {
      status: 200,
      headers: {
        'Content-Type': contentType
      }
    });
  }

  private getFakedMeasurementData(
    fragment: string,
    type: string
  ): { measurements: IMeasurement[] } {
    return {
      measurements: [getFakeMeasurement(fragment, type)]
    };
  }

  private getSourceValue(params: string) {
    const match = params.match(/"source":"(\d+)"/);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }
}
