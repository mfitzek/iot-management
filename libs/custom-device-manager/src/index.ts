import { BasicDevice } from './../../basic-device/src/index';

export * from './lib/custom-device-manager';

class DeviceTypeManager {
  device = new Map<string, BasicDevice>();

  registerDeviceType(type: string, device: BasicDevice) {
    return this;
  }
}

const manager = new DeviceTypeManager();

manager
  .registerDeviceType('basic-device', new BasicDevice())
  .registerDeviceType('basic-device', new BasicDevice());
