import { ITelemetryDevice } from '@iot/telemetry';

export interface TelemetryDataExporter {
  export(data: ITelemetryDevice[]): Buffer | string;
}
