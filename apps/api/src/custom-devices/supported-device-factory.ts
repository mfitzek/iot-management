import { CustomDeviceFactory } from '@iot/custom-device';
import { BasicDeviceFactory } from '@iot/custom-devices/basic-device/server';
import { ThermometerDeviceFactory } from './thermometer/thermometer-device-factory';

const supportedDeviceFactories: { [device: string]: CustomDeviceFactory } = {
  'basic-device': new BasicDeviceFactory(),
  Thermometer: new ThermometerDeviceFactory(),
};

export function getDeviceFactory(deviceType: string) {
  if (deviceType in supportedDeviceFactories) {
    return supportedDeviceFactories[deviceType];
  }
  throw new Error(`"${deviceType}" is not supported`);
}
