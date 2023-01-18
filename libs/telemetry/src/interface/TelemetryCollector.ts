import { ITelemetry } from './ITelemetry';
import { ISearchTelemetry } from './IApi';

export interface TelemetryCollector {
  getTelemetry(filter: ISearchTelemetry): Promise<ITelemetry[]>;
  saveTelemetry(telemetry: ITelemetry);
}
