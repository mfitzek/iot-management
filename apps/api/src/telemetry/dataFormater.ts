import { ITelemetry, ITelemetryAttribute, ITelemetryDevice } from '@iot/telemetry';

export function exportToJson(data: ITelemetryDevice[]) {
  return JSON.stringify(data);
}

export function exportToCsv(data: ITelemetryDevice[]) {
  const result = data.map((device) => deviceToCsv(device));
  const header =
    'DEVICE_ID;DEVICE_NAME;ATTRIBUTE_ID;ATTRIBUTE_NAME;ATTRIBUTE_TYPE;TELEMETRY_VALUE;TELEMETRY_TIMESTAMP;';
  result.unshift(header);
  return result.join('\n');
}

function deviceToCsv(device: ITelemetryDevice): string {
  const result = [];

  device.attributes.forEach((attr) => {
    attr.telemetry.forEach((telemetry) => {
      const record = `${device.id};${device.name};${attr.id};${attr.name};${attr.type};${
        telemetry.value
      };${telemetry.createdAt.getTime()};`;
      result.push(record);
    });
  });
  return result.join('\n');
}

export function exportToXml(data: ITelemetryDevice[]) {
  const devices = data.map(deviceToXml).join('');
  const result = `<?xml version="1.0" encoding="UTF-8"?>
<deviceList>
${devices}
</deviceList>
  `;
  return result;
}

function deviceToXml(device: ITelemetryDevice) {
  const attributes = device.attributes.map(attributeToXml).join('');
  const result =
    `\t<device id="${device.id}" name="${device.name}">\n` + attributes + '\t</device>';
  return result;
}

function attributeToXml(attribute: ITelemetryAttribute) {
  const telemetry = attribute.telemetry.map(telemetryToXml).join('');
  const result =
    `\t\t<attribute id="${attribute.id}" name="${attribute.name}" type="${attribute.type}">\n` +
    telemetry +
    '\t\t</attribute>\n';
  return result;
}

function telemetryToXml(telemetry: ITelemetry) {
  const reuslt =
    '\t\t\t<telemetry>\n' +
    `\t\t\t\t<value>${telemetry.value}</value>\n` +
    `\t\t\t\t<timestamp>${telemetry.createdAt.getTime()}</timestamp>\n` +
    '\t\t\t</telemetry>\n';
  return reuslt;
}
