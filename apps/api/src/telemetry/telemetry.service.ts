import { ISearchTelemetry, ITelemetryResponse } from '@iot/telemetry';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TelemetryService {
  // TODO: require user to check owner
  public async getTelemetry(query: ISearchTelemetry): Promise<ITelemetryResponse> {
    const result: ITelemetryResponse = {
      query: query,
      result: [],
    };
    return result;
  }
}
