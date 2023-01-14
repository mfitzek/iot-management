import { CustomDevice } from '@iot/custom-device';
import { BasicDevice } from '@iot/custom-devices/basic-device';
import { Thermometer } from '@iot/custom-devices/thermometer';
import {
  CustomDeviceAlreadyExistsError,
  CustomDeviceIsNotDefinedError,
} from '../errors/DeviceManagerErrors';

export class DeviceTypeManager {
  private devices = new Map<string, CustomDevice>();
  private static _instance = new DeviceTypeManager();

  private constructor() {
    this.registerDeviceType(new BasicDevice());
    this.registerDeviceType(new Thermometer());
  }

  public static get instance() {
    if (this._instance == null) {
      this._instance = new DeviceTypeManager();
    }
    return this._instance;
  }

  public registerDeviceType(device: CustomDevice) {
    const type = device.getType();
    if (this.devices.has(type)) {
      throw new CustomDeviceAlreadyExistsError(type);
    }
    this.devices.set(type, device);
    return this;
  }

  public getDevice(type: string): CustomDevice {
    const device = this.devices.get(type);
    if (device === undefined) {
      throw new CustomDeviceIsNotDefinedError(type);
    }
    return device;
  }

  public getTypesList(): Array<string> {
    return [...this.devices.keys()];
  }
}
