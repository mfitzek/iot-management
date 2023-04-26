import { ITelemetryDevice } from '@iot/telemetry';
import { TelemetryDataExporter } from './data-exporter';

export class CsvTelemetryDataExporter implements TelemetryDataExporter {
  public export(data: ITelemetryDevice[]): string | Buffer {
    return this.exportToCsv(data);
  }

  private exportToCsv(data: ITelemetryDevice[]): string {
    const result = data.map((device) => this.deviceToCsv(device));
    const header =
      'DEVICE_ID;DEVICE_NAME;ATTRIBUTE_ID;ATTRIBUTE_NAME;ATTRIBUTE_TYPE;TELEMETRY_VALUE;TELEMETRY_TIMESTAMP;';
    result.unshift(header);
    return result.join('\n');
  }

  private deviceToCsv(device: ITelemetryDevice): string {
    const result = [];

    device.attributes.forEach((attr) => {
      attr.telemetry.forEach((telemetry) => {
        const record = `${device.id};${device.name};${attr.id};${attr.name};${attr.type};${
          telemetry.value
        };${telemetry.createdAt.toISOString()};`;
        result.push(record);
      });
    });
    return result.join('\n');
  }
}
