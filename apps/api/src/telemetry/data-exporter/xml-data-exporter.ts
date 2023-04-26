import { ITelemetry, ITelemetryAttribute, ITelemetryDevice } from '@iot/telemetry';
import { TelemetryDataExporter } from './data-exporter';

export class XmlTelemetryDataExporter implements TelemetryDataExporter {
  export(data: ITelemetryDevice[]): string | Buffer {
    const devices = data.map(this.deviceToXml).join('');
    const result = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<deviceList>',
      devices,
      '</deviceList>',
    ].join('\n');
    return result;
  }

  private deviceToXml(device: ITelemetryDevice) {
    const attributes = device.attributes.map(this.attributeToXml).join('');
    const result =
      `\t<device id="${device.id}" name="${device.name}">\n` + attributes + '\t</device>';
    return result;
  }

  private attributeToXml(attribute: ITelemetryAttribute) {
    const telemetry = attribute.telemetry.map(this.telemetryToXml).join('');
    const result =
      `\t\t<attribute id="${attribute.id}" name="${attribute.name}" type="${attribute.type}">\n` +
      telemetry +
      '\t\t</attribute>\n';
    return result;
  }

  private telemetryToXml(telemetry: ITelemetry) {
    const reuslt =
      '\t\t\t<telemetry>\n' +
      `\t\t\t\t<value>${telemetry.value}</value>\n` +
      `\t\t\t\t<timestamp>${telemetry.createdAt.getTime()}</timestamp>\n` +
      '\t\t\t</telemetry>\n';
    return reuslt;
  }
}
