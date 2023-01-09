import { IDeviceData, IKeyValue } from '@iot/device';
import { IMqttSettings } from './IMqttSettings';

const MQTT_JSON_KEY = 'mqtt-settings';

export function getDeviceMqttSettings(device: IDeviceData) {
  const keyValue = device.keyValues.find((kv) => kv.key === MQTT_JSON_KEY);

  return keyValue ? getMqttSettingsFromKeyValue(keyValue) : undefined;
}

export function setDeviceMqttsettings(device: IDeviceData, settings: IMqttSettings) {
  const jsonData = JSON.stringify(settings);

  const keyValue = device.keyValues.find((kv) => kv.key === MQTT_JSON_KEY);
  if (keyValue) {
    keyValue.value = jsonData;
  } else {
    device.keyValues.push({
      key: MQTT_JSON_KEY,
      value: jsonData,
    });
  }
  return device;
}

export function getMqttSettingsFromKeyValue(keyValue: IKeyValue) {
  const settings: IMqttSettings = JSON.parse(keyValue.value);
  return settings;
}
