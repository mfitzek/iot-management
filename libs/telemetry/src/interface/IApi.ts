import { ITelemetryDevice } from './ITelemetry';

export interface ISearchTelemetry {
  attribute_ids?: string[];
  date_from?: Date;
  date_to?: Date;
  exportFormat?: FormatType;
}

export interface ITelemetryResponse {
  query: ISearchTelemetry;
  result: ITelemetryDevice[];
}

export type FormatType = 'JSON' | 'CSV' | 'XML';
export const supportedExportFormats = ['JSON', 'CSV', 'XML'];
