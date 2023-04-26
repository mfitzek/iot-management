import { ITelemetryDevice } from '@iot/telemetry';
import { TelemetryDataExporter } from './data-exporter';

export class JsonTelemetryDataExporter implements TelemetryDataExporter {
  public export(data: ITelemetryDevice[]): string | Buffer {
    return this.exportToJson(data);
  }

  private exportToJson(data: ITelemetryDevice[]) {
    return JSON.stringify(data);
  }
}
