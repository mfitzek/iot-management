import { Component, defineAsyncComponent } from 'vue';
import { BasicDeviceComponent } from '@iot/custom-devices/basic-device/client';

const supportedDevices: { [device: string]: Component } = {
  'basic-device': BasicDeviceComponent,
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
