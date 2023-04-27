import { getDeviceMqttSettings } from '../common';
import { BasicDeviceData } from '../common/BasicDeviceData';

export const defaultMqttSettings = {
  active: false,
  url: '',
  username: '',
  password: '',
  attribute_mapping: [],
};

export function parseMqttSettings(device: BasicDeviceData) {
  return getDeviceMqttSettings(device) ?? defaultMqttSettings;
}
