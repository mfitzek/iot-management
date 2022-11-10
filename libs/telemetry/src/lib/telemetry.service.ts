import { ITelemetry } from './../interface/ITelemetry';
import { Injectable } from '@nestjs/common';

import {
  ISearchTelemetry,
  ITelemetryService,
} from '../interface/ITelemetryService';

@Injectable()
export class TelemetryService implements ITelemetryService {
  private telemetry: ITelemetry[] = [];

  async getTelemetry(filter: ISearchTelemetry): Promise<ITelemetry[]> {
    return this.telemetry;
  }
  saveTelemetry(telemetry: ITelemetry) {
    this.telemetry.push(telemetry);
  }
}
