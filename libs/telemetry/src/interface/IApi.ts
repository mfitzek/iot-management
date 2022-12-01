import { ITelemetryDevice } from './ITelemetry';

export interface ISearchTelemetry {
  attribute_ids?: string[];
  date_from?: Date;
  date_to?: Date;
}

export interface ITelemetryResponse {
  query: ISearchTelemetry;
  result: ITelemetryDevice[];
}
