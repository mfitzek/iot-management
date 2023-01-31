import { Component, defineAsyncComponent } from 'vue';

const supportedDevices: { [device: string]: Component } = {
  'basic-device': defineAsyncComponent(() => import('./basic-device/basic-device.vue')),
  Thermometer: defineAsyncComponent(() => import('./thermometer/thermometer.vue')),
};

export function getDeviceTypes(): readonly string[] {
  return Object.keys(supportedDevices);
}

export function getDeviceComponent(deviceType: string) {
  if (deviceType in supportedDevices) {
    return supportedDevices[deviceType];
  }
  throw new Error(`"${deviceType}" is not supported`);
}
