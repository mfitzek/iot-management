import { DeviceData, IKeyValue, KeyValue } from '@iot/device';
import { IMqttSettings } from './IMqttSettings';

const MQTT_JSON_KEY = 'mqtt-settings';

export function getDeviceMqttSettings(device: DeviceData) {
  const keyValue = device.keyValues.find((kv) => kv.key === MQTT_JSON_KEY);

  return keyValue ? getMqttSettingsFromKeyValue(keyValue) : undefined;
}

export function getAsKeyValue(settings: IMqttSettings): KeyValue {
  const jsonData = JSON.stringify(settings);

  return {
    key: MQTT_JSON_KEY,
    value: jsonData,
  };
}

export function getMqttSettingsFromKeyValue(keyValue: IKeyValue) {
  const settings: IMqttSettings = JSON.parse(keyValue.value);
  return settings;
}
