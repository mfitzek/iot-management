import { ITelemetry, ISearchTelemetry } from '@iot/telemetry';

export interface TelemetryCollector {
  getTelemetry(filter: ISearchTelemetry): Promise<ITelemetry[]>;
  saveTelemetry(telemetry: ITelemetry);
}
