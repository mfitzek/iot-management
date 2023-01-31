import { Component } from 'vue';

const supportedDevices: { [device: string]: Component } = {
  'basic-device': () => import('./basic-device/basic-device.vue'),
  thermometer: () => import('./thermometer/thermometer.vue'),
};

export function getDeviceTypes(): readonly string[] {
  return Object.keys(supportedDevices);
}

export function getDeviceComponent(device: string) {
  if (device in supportedDevices) {
    return supportedDevices[device];
  }
  throw new Error(`"${device}" is not supported`);
}
