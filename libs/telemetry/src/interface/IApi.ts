import { ITelemetry, ITelemetryDevice } from './ITelemetry';

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

export interface DeviceTelemetryStats {
  id: string;
  name: string;
  attributes: AttributeTelemetryStats[];
}

export interface AttributeTelemetryStats {
  id: string;
  name: string;
  type: string;
  collected: number;
  last: ITelemetry | null;
}

export type FormatType = 'JSON' | 'CSV' | 'XML';
export const supportedExportFormats = ['JSON', 'CSV', 'XML'];
