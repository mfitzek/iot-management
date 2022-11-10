import { ITelemetry } from './ITelemetry';

export interface ISearchTelemetry {
  attribute_ids?: string[];
  date_from?: Date;
  date_to?: Date;
}

export interface ITelemetryService {
  getTelemetry(filter: ISearchTelemetry): Promise<ITelemetry[]>;
  saveTelemetry(telemetry: ITelemetry);
}
