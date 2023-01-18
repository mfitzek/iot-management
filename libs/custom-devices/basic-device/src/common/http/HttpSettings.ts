import { DeviceData } from '@iot/device';

export type HttpSettings = {
  active: boolean;
  accessToken: string;
};

export function getHttpGatewayKeyValue(device: DeviceData) {
  return device.keyValues.find((keyValue) => keyValue.key === 'http-gateway-settings');
}

export function getHttpSettings(device: DeviceData) {
  const keyValue = getHttpGatewayKeyValue(device);
  if (!keyValue) return undefined;

  const settings = JSON.parse(keyValue.value) as HttpSettings;
  return settings;
}

function createOrUpdateKeyValue(device: DeviceData, settings: HttpSettings) {
  const value = JSON.stringify(settings);
  const keyValue = getHttpGatewayKeyValue(device);
  if (keyValue) {
    keyValue.value = value;
  } else {
    device.keyValues.push({
      key: 'http-gateway-settings',
      value: value,
    });
  }
}

export function setHttpAccessToken(device: DeviceData, accessToken: string) {
  const currentSettings = getHttpSettings(device);

  const settings: HttpSettings = {
    active: currentSettings?.active ?? false,
    accessToken: accessToken,
  };

  createOrUpdateKeyValue(device, settings);
  return device;
}

export function setHttpGatewayActive(device: DeviceData, active: boolean) {
  const currentSettings = getHttpSettings(device);

  const settings: HttpSettings = {
    active: active,
    accessToken: currentSettings?.accessToken ?? '',
  };

  createOrUpdateKeyValue(device, settings);
  return device;
}
