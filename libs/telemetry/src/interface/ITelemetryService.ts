import { ITelemetry } from './ITelemetry';
import { ISearchTelemetry } from './IApi';
export interface ITelemetryService {
  getTelemetry(filter: ISearchTelemetry): Promise<ITelemetry[]>;
  saveTelemetry(telemetry: ITelemetry);
}
