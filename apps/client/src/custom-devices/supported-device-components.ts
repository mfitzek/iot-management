import { Component, defineAsyncComponent } from 'vue';
import { BasicDeviceComponent } from '@iot/custom-devices/basic-device/client';
import { ThermometerComponent } from '@iot/custom-devices/thermometer/client';

type SupportDeviceComponents = Record<string, Component>;

const supportedDevices: SupportDeviceComponents = {
  'basic-device': BasicDeviceComponent,
  Thermometer: ThermometerComponent,
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
